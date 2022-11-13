import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Message({ message, receiver, authUser }) {
  return (
    <div
      className={classNames({
        "flex gap-x-2 max-w-[45%]": true,
        "self-end": authUser.uid === message.author,
      })}
    >
      {authUser.uid !== message.author && (
        <Link
          to={`/${receiver.username}`}
          className="min-w-fit min-h-6 rounded-full self-end mb-1"
        >
          <img
            src={receiver.photoURL}
            alt=""
            className="w-6 h-6 rounded-full self-end mb-1"
          />
        </Link>
      )}
      <p
        style={{ hyphens: "auto" }}
        className={classNames({
          "break-all min-h-[44px] inline-flex items-center py-3 px-4 text-sm rounded-3xl": true,
          "border border-gray-200": authUser.uid !== message.author,
          "bg-[#efefef]": authUser.uid === message.author,
        })}
      >
        {message.message}
      </p>
    </div>
  );
}
