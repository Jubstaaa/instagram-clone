import { getFriendInfo } from "firebaseConfig";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TimeAgo from "react-timeago";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { deleteComment } from "firebaseConfig";

function Comment({
  comment,
  post,
  authUser,
  userData,
  type = null,
  setForce = null,
  force = null,
}) {
  const [user, setUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDeleteModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

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
  if (type === "feed") {
    return (
      <p className="text-sm">
        <Link to={`/${user.username}`}>
          <span className="font-semibold">{user.username} </span>
        </Link>
        {comment.comment}
      </p>
    );
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
          {user.uid === authUser.uid || userData.uid === authUser.uid ? (
            <BiDotsHorizontalRounded
              onClick={() => {
                setDeleteModal(true);
              }}
              className="w-6 h-6 cursor-pointer text-[#8e8e8e]"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {deleteModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={modalRef}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div
                onClick={async () => {
                  await deleteComment(userData, post, comment.uid, authUser);
                  setDeleteModal(false);
                  setForce(!force);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Delete
                </span>
              </div>
              <div
                className="p-3 space-y-6   text-center cursor-pointer"
                onClick={() => {
                  setDeleteModal(false);
                }}
              >
                <span className="text-black text-sm font-normal leading-relaxed">
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Comment;
