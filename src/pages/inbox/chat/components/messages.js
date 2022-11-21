import Message from "./message";
import { useEffect, useRef } from "react";
import { seenMessage } from "firebaseConfig";
export default function Messages({
  messages,
  receiver,
  authUser,
  conversationId,
}) {
  const chatRef = useRef(null);

  useEffect(() => {
    let browser_active = (
      typeof document.hasFocus != "undefined" ? document.hasFocus() : 1
    )
      ? 1
      : 0;
    if (!browser_active) {
    } else {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      seenMessage(
        messages.filter((message) => message.author !== authUser.uid).at(-1),
        conversationId
      );
    }
  }, [messages]);

  window.addEventListener("focus", () => {
    seenMessage(
      messages.filter((message) => message.author !== authUser.uid).at(-1),
      conversationId
    );
  });

  return (
    <main
      ref={chatRef}
      className="h-[calc(100%-144px)] px-4 overflow-auto messages-box space-y-2 flex flex-col"
    >
      <div className="mb-auto" />

      {messages.map((message, i) => (
        <Message
          message={message}
          key={message.id}
          receiver={receiver}
          authUser={authUser}
          chatRef={chatRef}
          lastMessage={i === messages.length - 1 ? true : false}
        />
      ))}
    </main>
  );
}
