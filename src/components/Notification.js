import { useState, useEffect, useRef } from "react";
import {
  unfollow,
  getFriendInfo,
  follow,
  seenNotification,
} from "firebaseConfig";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import Button from "./Button";

function Notification({ notification, setNotificationModal }) {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  const authUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFriendInfo(notification?.uid)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        setUser(false);
      });
    seenNotification(notification, authUser);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (user === null) {
    return <></>;
  }
  if (user === false) {
    return <></>;
  }

  if (notification?.type === "follow") {
    return (
      <div className="flex justify-between items-center hover:bg-zinc-50 p-2 ">
        <Link
          to={`/${user?.username || "#"}`}
          onClick={() => {
            setNotificationModal(false);
          }}
          className="flex items-center justify-start space-x-2  py-2 pl-3 pr-1  "
        >
          <img
            className="profilePhoto"
            src={user?.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />

          <div className="flex flex-col items-start justify-center ">
            <div className="flex justify-center items-center">
              <p
                className=" text-sm pr-0.5 truncate"
                onClick={() => {
                  setNotificationModal(false);
                }}
              >
                <span className="font-semibold ">
                  {user?.username || "Deleted User"}
                </span>{" "}
                started to following you.
              </p>
            </div>
            <span className="text-secondaryLink text-sm text-left">
              <TimeAgo date={notification?.date} />
            </span>
          </div>
        </Link>
        <div className="flex flex-col justify-between  pr-3  ">
          {authUser?.following?.find((el) => el.uid === user?.uid) && user && (
            <button
              onClick={() => {
                setModal(true);
              }}
              className="text-black border relative border-secondaryBorder w-[71px] h-[30px] font-semibold  px-1 py-1 rounded  text-sm "
              type="button"
            >
              {loading ? (
                <img className="loading" src="/img/loading-gray.svg" alt="" />
              ) : (
                "Following"
              )}
            </button>
          )}

          {!authUser?.following?.find((el) => el.uid === user?.uid) && user && (
            <button
              onClick={async () => {
                setLoading(true);
                await follow(authUser, user);
                setLoading(false);
              }}
              className="text-white bg-brand border relative border-secondaryBorder w-[71px] h-[30px] font-semibold  px-1 py-1 rounded  text-sm "
              type="button"
            >
              {loading ? (
                <img className="loading" src="/img/loading-gray.svg" alt="" />
              ) : (
                "Follow"
              )}
            </button>
          )}
        </div>

        {modal && (
          <div className="darkModal">
            <div
              ref={modalRef}
              className="relative w-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="flex flex-col items-center justify-center p-5 border-b rounded-t space-y-1">
                  <img
                    src={user?.photoURL || "/img/no-avatar.jpeg"}
                    alt=""
                    className="w-[90px] h-[90px] rounded-full mb-5"
                  />
                  <p className="text-gray-900 text-sm text-center ">
                    Unfollow @{user?.username}?
                  </p>
                </div>

                <div
                  onClick={async () => {
                    setModal(false);
                    setLoading(true);
                    await unfollow(authUser, user);
                    setLoading(false);
                  }}
                  className="p-3 space-y-6 border-b  text-center cursor-pointer"
                >
                  <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                    Unfollow
                  </span>
                </div>
                <div
                  className="p-3 space-y-6   text-center cursor-pointer"
                  onClick={() => {
                    setModal(false);
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
      </div>
    );
  } else if (notification?.type === "like") {
    return (
      <Link
        to={`/${authUser?.username}/${notification?.postUid}`}
        onClick={() => {
          setNotificationModal(false);
        }}
        className="flex justify-between items-center hover:bg-zinc-50 p-2"
      >
        <div className="flex items-center justify-start space-x-2  py-2 pl-3 pr-1 ">
          <img
            className="profilePhoto"
            src={user?.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />

          <div className="flex flex-col items-start justify-center">
            <div className="flex justify-center items-center">
              <p
                className=" text-sm pr-0.5"
                onClick={() => {
                  setNotificationModal(false);
                }}
              >
                <span className="font-semibold">
                  {user?.username || "Deleted User"}{" "}
                </span>{" "}
                liked your post.
              </p>
            </div>
            <span className="text-secondaryLink text-sm text-left">
              <TimeAgo date={notification?.date} />
            </span>
          </div>
        </div>
        {notification?.file?.type.includes("image") && (
          <img
            className="w-11 h-11 object-cover mr-3"
            src={notification?.file?.url}
            alt=""
          />
        )}
        {notification?.file?.type.includes("video") && (
          <video className="w-11 h-11 object-cover mr-3">
            <source src={notification?.file?.url} type="video/mp4" />
          </video>
        )}
      </Link>
    );
  } else if (notification?.type === "comment") {
    return (
      <Link
        to={`/${authUser?.username}/${notification?.postUid}`}
        onClick={() => {
          setNotificationModal(false);
        }}
        className="flex justify-between items-center hover:bg-zinc-50 p-2"
      >
        <div className="flex items-center justify-start space-x-2  py-2 pl-3 pr-1 ">
          <img
            className="profilePhoto"
            src={user?.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />

          <div className="flex flex-col items-start justify-center">
            <div className="flex justify-center items-center">
              <p
                className=" text-sm pr-0.5"
                onClick={() => {
                  setNotificationModal(false);
                }}
              >
                <span className="font-semibold">
                  {user?.username || "Deleted User"}{" "}
                </span>{" "}
                commented: {notification?.comment}
              </p>
            </div>
            <span className="text-secondaryLink text-sm text-left">
              <TimeAgo date={notification?.date} />
            </span>
          </div>
        </div>
        {notification?.file?.type.includes("image") && (
          <img
            className="w-11 h-11 object-cover mr-3"
            src={notification?.file?.url}
            alt=""
          />
        )}
        {notification?.file?.type.includes("video") && (
          <video className="w-11 h-11 object-cover mr-3">
            <source src={notification?.file?.url} type="video/mp4" />
          </video>
        )}
      </Link>
    );
  }
}

export default Notification;
