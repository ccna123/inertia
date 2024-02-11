import React, { useEffect, useRef, useState } from "react";
import MediaHandlder from "../helper/getPermission";

const Chat = () => {
    const myChatVideo = useRef(null);
    const otherUserChatVideo = useRef(null);
    const [hasMedia, setHasMedia] = useState(false);
    const [otherUserId, setOtherUserId] = useState(null);

    const handleTurnOff = () => {
        const stream = myChatVideo.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }
    };

    const handleCall = () => {
        const mediaHandler = new MediaHandlder();
        mediaHandler.getPermission().then((stream) => {
            setHasMedia(true);
            myChatVideo.current.srcObject = stream;
            myChatVideo.current.play();
        });
    };

    return (
        <div className="bg-white mt-10 mx-3 rounded-md p-4 lg:w-[80%] lg:mx-auto">
            <div className="lg:w-[50%] lg:mx-auto">
                <div className="relative">
                    <video
                        ref={otherUserChatVideo}
                        className="w-full h-[30rem] bg-black rounded-md lg:mx-auto"
                        autoPlay
                    />
                    <video
                        ref={myChatVideo}
                        className="w-[130px] h-[130px] bg-black rounded-md lg:mx-auto absolute bottom-0 left-0 z-2"
                        autoPlay
                    />
                </div>
                <div className="flex flex-col my-4 gap-4 text-white font-bold lg:w-[60%] lg:mx-auto">
                    <button
                        onClick={handleCall}
                        className="bg-green-400 rounded-md p-2 cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100"
                    >
                        Call
                    </button>
                    <button
                        onClick={handleTurnOff}
                        className="bg-red-400 rounded-md p-2 cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100"
                    >
                        Turn off
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
