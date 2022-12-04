import { Outlet, useParams } from "react-router-dom";
import Sidebar from "pages/inbox/components/sidebar";
import { useState, useEffect, useRef } from "react";
import Icon from "components/Icon";
import Search from "components/Search";
import { getMessages } from "firebaseConfig";
import { Helmet } from "react-helmet";
export default function InboxLayout() {
  const [message, setMessage] = useState(false);
  const messageRef = useRef(null);
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(conversationId, setMessages);
  }, [conversationId]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setMessage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messageRef]);

  return (
    <div className="border border-gray-300 rounded bg-white h-[calc(100vh-250px)] sm:h-[calc(100vh-97px)] flex">
      <Helmet>
        <title>Inbox • Direct</title>
      </Helmet>
      <Sidebar setMessage={setMessage} messages={messages} />
      <Outlet context={[setMessage, messages, setMessages]} />

      {message && (
        <div className="darkModal">
          <Helmet>
            <title>New Message • Direct</title>
          </Helmet>
          <div
            ref={messageRef}
            className="relative w-[400px] h-[400px] max-h-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="p-3 text-center  flex justify-between items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setMessage(false);
                  }}
                >
                  <Icon name="close" size={18} />
                </div>

                <span className="  font-semibold leading-relaxed">
                  New message
                </span>
                <button
                  //   disabled={!comment}
                  className=" text-brand disabled:opacity-60 "
                  //   onClick={async () => {
                  //     await addComment(comment, userData, post, authUser);
                  //     setComment("");
                  //     setForce(!force);
                  //   }}
                >
                  Next
                </button>
              </div>
              <div className="flex justify-center items-center">
                <Search
                  className="w-full"
                  type="message"
                  setMessage={setMessage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
