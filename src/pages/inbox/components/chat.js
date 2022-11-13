import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getFriendInfo, getLastMessage } from "firebaseConfig";
import TimeAgo from "react-timeago";

function Chat({ chat, conversationId }) {
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  useEffect(() => {
    getFriendInfo(chat.receiver)
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
    getLastMessage(chat.uid, setLastMessage);
  }, []);

  if (!user) {
    return <></>;
  }

  if (!lastMessage) {
    return <></>;
  }

  return (
    <NavLink
      className={classNames({
        "h-[72px] grid grid-flow-col items-center justify-start gap-x-4 hover:bg-zinc-50 px-5": true,
        "font-semibold": chat?.unread,
        "!bg-[#efefef]": conversationId === chat.uid,
      })}
      key={chat.uid}
      to={`/direct/${chat.uid}`}
    >
      <div className="relative">
        <img
          src={user.photoURL}
          className="w-14 h-14 rounded-full object-cover"
          alt=""
        />
        <div className="border-[3.5px] border-white h-5 w-5 ml-[3px] mt-[3px] bg-green-400 rounded-full absolute bottom-0 right-0"></div>
      </div>
      <div className="w-full">
        <h6 className="text-sm">{user.username}</h6>

        <div
          className={`inline-grid grid-flow-col gap-2 justify-between items-center flex-nowrap" text-sm ${
            !chat?.unread && "text-[#8e8e8e]"
          }`}
        >
          <span className="truncate ">{lastMessage?.message} </span>{" "}
          <span className="justify-self-center	">·</span>
          <span className="whitespace-nowrap ">
            {<TimeAgo date={lastMessage?.date} />}{" "}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default Chat;
