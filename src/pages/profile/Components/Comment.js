import { getFriendInfo } from "firebaseConfig";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function Comment({ comment }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getFriendInfo(comment.userUid)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        setUser(false);
      });
  }, []);

  if (user === null) {
    return <></>;
  }
  if (user === false) {
    return <></>;
  }

  return (
    <li className="flex justify-start items-center space-x-4">
      <img src={user.photoURL} className="rounded-full h-7 w-7" alt="" />
      <div className="flex flex-col justify-start items-start">
        <div className="flex justify-start items-center space-x-1">
          <Link
            className="font-semibold cursor-pointer text-sm"
            href={`/${user.username}`}
          >
            {user.username}
          </Link>
          <p className="text-sm">{comment.comment}</p>
        </div>
        <div className="flex justify-start items-center space-x-2">
          <p className="text-xs text-[#8e8e8e]">
            <TimeAgo date={comment.date} />
          </p>
          <BiDotsHorizontalRounded className="w-6 h-6 cursor-pointer text-[#8e8e8e]" />
        </div>
      </div>
    </li>
  );
}

export default Comment;
