import Message from "./message";
import { useEffect, useRef } from "react";
export default function Messages({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 100);
  }, [messages]);
  return (
    <main
      ref={chatRef}
      className="h-[calc(100%-144px)] px-4 overflow-auto messages-box space-y-2"
    >
      <div className="mb-auto" />

      {messages.map((message, key) => (
        <Message message={message} key={key} />
      ))}
    </main>
  );
}
