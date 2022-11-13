import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getChatList } from "firebaseConfig";
import Chat from "./chat";

export default function ChatList({ user }) {
  const [chats, setChats] = useState(null);
  const { conversationId } = useParams();

  useEffect(() => {
    getChatList(user)
      .then((res) => setChats(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-[calc(100%-60px)] overflow-auto py-3">
      <header className="flex items-center justify-between px-5 mb-1">
        <h6 className="text-base font-semibold">Messages</h6>
        {/* <button className="text-brand text-sm font-semibold">
          16 requests
        </button> */}
      </header>
      {chats?.map((chat) => (
        <Chat key={chat.uid} chat={chat} conversationId={conversationId} />
      ))}
    </div>
  );
}
