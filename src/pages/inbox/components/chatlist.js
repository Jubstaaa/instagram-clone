import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getChatList, getLastMessage } from "firebaseConfig";
import Chat from "./chat";

export default function ChatList({ user, messages }) {
  const [chats, setChats] = useState([]);
  const { conversationId } = useParams();

  const test = async (res) => {
    const newArray = [];
    for (let chat of res) {
      newArray.push({ ...chat, lastMessage: await getLastMessage(chat.uid) });
    }
    setChats(newArray);
  };

  useEffect(() => {
    getChatList(user)
      .then((res) => {
        test(res);
      })
      .catch((err) => console.log(err));
  }, [messages]);

  return (
    <div className="h-[calc(100%-60px)] overflow-auto py-3">
      <header className="flex items-center justify-between px-5 mb-1">
        <h6 className="text-base font-semibold">Messages</h6>
        {/* <button className="text-brand text-sm font-semibold">
          16 requests
        </button> */}
      </header>
      {chats
        ?.sort((a, b) => b?.lastMessage?.date - a?.lastMessage?.date)
        .map((chat, i) => (
          <Chat
            key={chat.uid}
            chat={chat}
            conversationId={conversationId}
            lastMessage={chat.lastMessage}
          />
        ))}
    </div>
  );
}
