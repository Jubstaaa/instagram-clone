import Icon from "components/Icon";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import ChatList from "pages/inbox/components/chatlist";

export default function Sidebar({ setMessage, messages }) {
  const user = useSelector((state) => state.auth.user);
  const { conversationId } = useParams();
  return (
    <aside
      className={classNames({
        "w-full sm:w-[349px]  flex-shrink-0 border-r border-gray-300": true,
        "hidden sm:block": conversationId,
      })}
    >
      <header className="h-[60px] border-b border-gray-300 flex justify-between items-center px-5">
        <button className="flex items-center mx-auto gap-x-2.5 text-base font-semibold">
          {user.username}
          <Icon className="rotate-180" name="chevron-down" size={20} />
        </button>
        <Icon
          onClick={() => {
            setMessage(true);
          }}
          className="cursor-pointer"
          name="new-message"
          size={24}
        />
      </header>
      <ChatList user={user} messages={messages} />
    </aside>
  );
}
