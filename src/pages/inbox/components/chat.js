import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getFriendInfo, getStatus } from "firebaseConfig";
import TimeAgo from "react-timeago";
import { useSelector } from "react-redux";

function Chat({ chat, conversationId, lastMessage }) {
  const authUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(null);
  useEffect(() => {
    getFriendInfo(chat.receiver)
      .then(async (res) => {
        getStatus(res, setUser);
      })
      .catch((err) => console.log(err));
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
        "h-[72px] grid grid-flow-col items-center justify-between hover:bg-zinc-50 px-5": true,
        "!bg-[#efefef]": conversationId === chat.uid,
      })}
      key={chat.uid}
      to={`/direct/${chat.uid}`}
    >
      <div className=" grid grid-flow-col items-center justify-between gap-x-4">
        <div className="relative">
          <img
            src={user.photoURL}
            className="w-14 h-14 rounded-full object-cover"
            alt=""
          />
          {user.status && (
            <div className="border-[3.5px] border-white h-5 w-5 ml-[3px] mt-[3px] bg-green-400 rounded-full absolute bottom-0 right-0"></div>
          )}
        </div>
        <div className="w-full">
          <h6
            className={classNames({
              "text-sm": true,
              "font-semibold text-[#262626]":
                lastMessage?.unread && lastMessage.author !== authUser.uid,
            })}
          >
            {user.username}
          </h6>

          <div
            className={`inline-grid grid-flow-col gap-2 justify-between items-center flex-nowrap" text-sm ${
              !chat?.unread && "text-secondaryLink"
            }`}
          >
            <span
              className={classNames({
                truncate: true,
                "font-semibold text-[#262626]":
                  lastMessage?.unread && lastMessage.author !== authUser.uid,
              })}
            >
              {lastMessage?.message}{" "}
            </span>{" "}
            <span className="justify-self-center	">·</span>
            <span className="whitespace-nowrap ">
              {<TimeAgo date={lastMessage?.date} />}{" "}
            </span>
          </div>
        </div>
      </div>
      {lastMessage?.unread && lastMessage.author !== authUser.uid && (
        <div className="h-2 w-2 bg-brand rounded-full"></div>
      )}
    </NavLink>
  );
}

export default Chat;
