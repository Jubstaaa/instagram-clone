import classNames from "classnames";
import { Link } from "react-router-dom";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Icon from "components/Icon";
import DirectPost from "./directPost";

export default function Message({ message, receiver, authUser, chatRef }) {
  const [toggler, setToggler] = useState(false);

  const checkLinks = (string) => {
    const textArray = string?.split(" ");
    const result = textArray?.map((text, i) => {
      let url;
      try {
        url = new URL(text);
      } catch (_) {
        return text + " ";
      }

      return (
        <a
          key={i}
          href={text}
          target="_blank"
          className="contents text-[#00376B] hover:underline"
        >
          {text + " "}
        </a>
      );
    });
    return result;
  };

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
      {message?.image ? (
        <>
          <img
            className="cursor-pointer"
            onClick={() => setToggler(!toggler)}
            src={message.image}
          />
          <FsLightbox
            toggler={toggler}
            sources={[<img src={message.image} />]}
          />
        </>
      ) : message.message === "❤️" ? (
        <Icon name="redHeart" size={44} />
      ) : message?.post ? (
        <DirectPost post={message.post} chatRef={chatRef} />
      ) : (
        <p
          style={{ hyphens: "auto" }}
          className={classNames({
            "break-all min-h-[44px] items-center py-3 px-4 text-sm rounded-3xl": true,
            "border border-gray-200": authUser.uid !== message.author,
            "bg-[#efefef]": authUser.uid === message.author,
          })}
        >
          {checkLinks(message.message)}
        </p>
      )}
      <></>
    </div>
  );
}
