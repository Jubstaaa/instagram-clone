import Header from "./components/header";
import Reply from "./components/reply";
import Messages from "pages/inbox/chat/components/messages";
import { useState, useEffect } from "react";
import {
  checkReceiverUser,
  checkSenderUser,
  getMessages,
} from "firebaseConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Inbox from "../inbox";
export default function Chat() {
  const authUser = useSelector((state) => state.auth.user);
  const { conversationId } = useParams();
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    checkSenderUser(conversationId, authUser, setSender);
    checkReceiverUser(conversationId, authUser, setReceiver);
    getMessages(conversationId, setMessages);
  }, [conversationId]);

  if (!sender) {
    return <Inbox />;
  }

  if (!receiver) {
    return <></>;
  }

  return (
    <div className="flex-1">
      <Header user={receiver} />
      <Messages messages={messages} receiver={receiver} authUser={authUser} />
      <Reply
        setMessages={setMessages}
        conversationId={conversationId}
        receiver={receiver}
        authUser={authUser}
      />
    </div>
  );
}
