import Icon from "components/Icon";
import { sendMessage, sendPhoto } from "firebaseConfig";
import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-hot-toast";

export default function Reply({
  setMessages,
  authUser,
  conversationId,
  receiver,
}) {
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const inputFile = useRef(null);

  const addPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      return toast.error("Unsupported file type");
    } else {
      await sendPhoto(file, authUser, conversationId);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(authUser, message, conversationId, receiver);
    setMessage("");
  };

  return (
    <footer className="h-[84px] flex items-center justify-center px-6 ">
      <form
        onSubmit={onSubmit}
        className="h-[44px] border rounded-full flex items-center w-full pl-[11px] pr-[8px] relative"
      >
        <button
          type="button"
          ref={emojiRef}
          className="w-[40px] h-[42px] flex items-center justify-center"
          onClick={() => {
            setEmojiPicker(true);
          }}
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
              <Icon
                onClick={() => {
                  inputFile?.current?.click();
                }}
                name="image"
                size={24}
              />
              <input
                className="hidden w-0 h-0 absolute"
                type="file"
                ref={inputFile}
                onChangeCapture={addPhoto}
              />
            </button>
            <button
              type="button"
              className="w-[40px] h-[42px] flex items-center justify-center"
            >
              <Icon
                onClick={(e) => {
                  e.preventDefault();
                  sendMessage(authUser, "❤️", conversationId, receiver);
                  setMessage("");
                }}
                name="heart"
                size={24}
              />
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
        {emojiPicker && (
          <div ref={emojiRef} className="absolute bottom-full left-0">
            <EmojiPicker
              onEmojiClick={(emojiData, event) => {
                setMessage(message + emojiData.emoji);
                console.log(emojiData.getImageUrl());
              }}
              height="20rem"
              width="100%"
              autoFocusSearch={true}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </form>
    </footer>
  );
}
