import React, { useEffect, useRef, useState } from "react";
import MediaHandlder from "../helper/getPermission";
import { io } from "socket.io-client";
import FriendList from "../Shared/FriendList";
import { Inertia } from "@inertiajs/inertia";
import Peer from "peerjs";

let peerConnection;

const Chat = ({ node_websocket, friendList, auth }) => {
    const myChatVideo = useRef(null);
    const otherUserChatVideo = useRef(null);
    const [stream, setStream] = useState(null);
    const [callTo, setCallTo] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const [peersId, setPeersId] = useState({});

    const servers = {
        iceServers: [
            {
                urls: ["stun.l.google.com:19302", "stun1.l.google.com:19302"],
            },
        ],
    };

    const handleTurnOff = () => {
        const stream = myChatVideo.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
            setIsCalling(false);
            socket.emit("manual_disconnect");
        }
        socket.on("user_manual_disconnected", (userId) => {
            console.log(userId);
        });
    };

    const handleCall = () => {
        new MediaHandlder()
            .getPermission()
            .then((stream) => {
                setStream(stream);
                setIsCalling(true);
                addVideoStream(myChatVideo, stream);

                const peer = new Peer(undefined, {
                    host: "/",
                    port: "8001",
                });

                peer.on("call", (call) => {
                    call.answer(stream);

                    call.on("stream", (otherUserVideoStream) => {
                        addVideoStream(
                            otherUserChatVideo,
                            otherUserVideoStream
                        );
                    });
                });

                peer.on("open", (userId) => {
                    const roomId = [auth.id, callTo.id].sort().join("_");
                    socket.emit("join_room", {
                        roomId,
                        userId,
                        callTo: callTo ? callTo.name : "",
                    });
                });

                socket.on("user_connected", (userId) => {
                    connectToNewUser(userId, stream, peer);
                });

                socket.on("user_disconnected", (userId) => {
                    if (peersId[userId]) {
                        peersId[userId].close();
                    }
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
    const handleChooseFriend = (id) => {
        const selectedFriend = friendList.find((friend) => friend.id === id);
        if (selectedFriend) {
            setCallTo(selectedFriend);
        } else {
            return;
        }
    };

    const addVideoStream = (videoRef, stream) => {
        if (videoRef.current) {
            videoRef.current.srcObject = null; // Clear previous stream
            videoRef.current.srcObject = stream; // Set new stream
            videoRef.current
                .play()
                .catch((error) => console.error("Play error:", error));
        }
    };

    const connectToNewUser = (userId, stream, peer) => {
        const call = peer.call(userId, stream);
        call.on("stream", (otherUserVideoStream) => {
            addVideoStream(otherUserChatVideo, otherUserVideoStream);
        });
        call.on("close", () => {
            const stream = otherUserChatVideo.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
                setIsCalling(false);
            }
        });
        setPeersId((prev) => ({
            ...prev,
            [userId]: call,
        }));
    };

    useEffect(() => {
        const socket = io(node_websocket);
        socket.on("connect", () => {
            console.log("Hello from node");
        });
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, [node_websocket]);

    return (
        <div className="bg-white mt-10 mx-3 rounded-md p-4 lg:w-[80%] lg:mx-auto">
            <div className="flex items-center justify-center space-x-40 border-2 border-blue-500">
                <div className="border-2 border-black w-[60%]">
                    <div className="flex items-center justify-center">
                        <div className="w-full relative border-2 border-green-400">
                            <video
                                ref={otherUserChatVideo}
                                className=" h-[30rem] bg-black rounded-md lg:mx-auto"
                                autoPlay
                            />
                            {isCalling ? (
                                <video
                                    ref={myChatVideo}
                                    className="w-[130px] h-[130px] bg-white rounded-md lg:mx-auto absolute bottom-0 left-0 z-2"
                                    autoPlay
                                />
                            ) : (
                                <video
                                    ref={myChatVideo}
                                    className="w-[130px] h-[130px] bg-black rounded-md lg:mx-auto absolute bottom-0 left-0 z-2"
                                    autoPlay
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col my-4 gap-4 text-white font-bold lg:w-[60%] lg:mx-auto">
                        <button
                            onClick={handleCall}
                            className="bg-green-400 rounded-md p-2 cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100"
                        >
                            Call {callTo ? callTo.name : ""}
                        </button>
                        <button
                            onClick={handleTurnOff}
                            className="bg-red-400 rounded-md p-2 cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100"
                        >
                            Turn off
                        </button>
                    </div>
                </div>
                {/* list friend */}
                <div className="border-2 border-red-500 h-[512px] w-[256px] overflow-y-scroll">
                    {friendList.map((friend) => {
                        return (
                            <FriendList
                                key={friend.id}
                                friend={friend}
                                id={friend.id}
                                handleChooseFriend={handleChooseFriend}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Chat;
