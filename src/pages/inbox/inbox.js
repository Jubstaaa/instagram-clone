import Icon from "components/Icon";
import { useOutletContext } from "react-router-dom";

export default function Inbox() {
  const [setMessageModal, messages, setMessages] = useOutletContext();

  return (
    <div className="w-full h-full flex items-center gap-y-1 justify-center flex-col">
      <Icon name="direct-empty" size={96} />
      <h2 className="text-[22px] font-light">Your Messages</h2>
      <p className="text-sm text-[#8e8e8e]">
        Send private photos and messages to a friend or group.
      </p>
      <div className="mt-3">
        <button
          onClick={() => {
            setMessageModal(true);
          }}
          className="h-[30px] mt-1 w-full flex items-center justify-center gap-x-2 rounded bg-brand font-medium text-white px-2.5 text-sm disabled:opacity-50"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
