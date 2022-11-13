import Message from "./message";
import { useEffect, useRef } from "react";
export default function Messages({ messages, receiver, authUser }) {
  const chatRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  }, [messages]);

  return (
    <main
      ref={chatRef}
      className="h-[calc(100%-144px)] px-4 overflow-auto messages-box space-y-2 flex flex-col"
    >
      <div className="mb-auto" />

      {messages.map((message) => (
        <Message
          message={message}
          key={message.id}
          receiver={receiver}
          authUser={authUser}
        />
      ))}
    </main>
  );
}
