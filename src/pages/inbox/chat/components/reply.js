import Icon from "components/Icon";
import { sendMessage } from "firebaseConfig";
import { useState } from "react";
export default function Reply({
  setMessages,
  authUser,
  conversationId,
  receiver,
}) {
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(authUser, message, conversationId);
    setMessage("");
  };

  return (
    <footer className="h-[84px] flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="h-[44px] border rounded-full flex items-center w-full pl-[11px] pr-[8px]"
      >
        <button
          type="button"
          className="w-[40px] h-[42px] flex items-center justify-center"
        >
          <Icon name="emoji" size={24} />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 outline-none h-[40px] placeholder:text-gray-500 focus:placeholder:text-gray-300 text-sm px-[9px]"
          placeholder="Message.."
        />
        {!message && (
          <>
            <button
              type="button"
              className="w-[40px] h-[42px] flex items-center justify-center"
            >
              <Icon name="image" size={24} />
            </button>
            <button
              type="button"
              className="w-[40px] h-[42px] flex items-center justify-center"
            >
              <Icon name="heart" size={24} />
            </button>
          </>
        )}
        {message && (
          <button
            type="submit"
            className="text-brand font-semibold text-sm px-3"
          >
            Send
          </button>
        )}
      </form>
    </footer>
  );
}
