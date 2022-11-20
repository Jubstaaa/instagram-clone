import { Outlet, useParams } from "react-router-dom";
import Sidebar from "pages/inbox/components/sidebar";
import { useState, useEffect, useRef } from "react";
import Icon from "components/Icon";
import Search from "components/Search";
import { getMessages } from "firebaseConfig";
export default function InboxLayout() {
  const [messageModal, setMessageModal] = useState(false);
  const messageModalRef = useRef(null);
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    getMessages(conversationId, setMessages);
  }, [conversationId]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        messageModalRef.current &&
        !messageModalRef.current.contains(event.target)
      ) {
        setMessageModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messageModalRef]);

  return (
    <div className="border border-gray-300 rounded bg-white h-[calc(100vh-97px)] flex">
      <Sidebar setMessageModal={setMessageModal} messages={messages} />
      <Outlet context={[setMessageModal, messages, setMessages]} />

      {messageModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={messageModalRef}
            className="relative w-[400px] h-[400px] max-h-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="p-3 text-center  flex justify-between items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setMessageModal(false);
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
                  setMessageModal={setMessageModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
