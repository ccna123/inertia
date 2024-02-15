import React from "react";

const FriendList = ({ friend, id, handleChooseFriend }) => {
    return (
        <div
            onClick={() => handleChooseFriend(id)}
            className="bg-slate-300 rounded-md p-2 cursor-pointer m-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100"
        >
            <p>{friend.name}</p>
        </div>
    );
};

export default FriendList;
