import Header from "./components/header";
import Reply from "./components/reply";
import Messages from "pages/inbox/chat/components/messages";
import { useState, useEffect } from "react";
import { checkReceiverUser } from "firebaseConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Chat() {
  const authUser = useSelector((state) => state.auth.user);
  const { conversationId } = useParams();
  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    checkReceiverUser(conversationId, authUser, setReceiver);
  }, []);

  const [messages, setMessages] = useState([]);

  return (
    <div className="flex-1">
      <Header user={receiver} />
      <Messages messages={messages} />
      <Reply
        setMessages={setMessages}
        conversationId={conversationId}
        receiver={receiver}
        authUser={authUser}
      />
    </div>
  );
}
