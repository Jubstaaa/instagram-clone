import { useState, useEffect, useRef } from "react";
import { unfollower, getFriendInfo, follow } from "firebaseConfig";
import { Link } from "react-router-dom";
function Friend({
  uid,
  loading,
  setLoading,
  authUser,
  setFollowersModal,
  userData,
}) {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    getFriendInfo(uid)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        setUser(false);
      });
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

  return (
    <li key={user?.uid} className="flex justify-between items-center">
      <div className="flex items-center justify-start space-x-2  py-2 pl-3 pr-1 ">
        <Link
          onClick={() => {
            setFollowersModal(false);
          }}
          to={`/${user?.username}`}
        >
          <img
            className="h-11 w-11 inline-block rounded-full "
            src={user?.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />
        </Link>

        <div className="flex flex-col items-start justify-center">
          <div className="flex justify-center items-center">
            <Link
              className="font-semibold text-sm pr-0.5"
              onClick={() => {
                setFollowersModal(false);
              }}
              to={`/${user?.username}`}
            >
              {user?.username}
            </Link>

            {!authUser.following.find((el) => el.uid === user?.uid) &&
              authUser.uid === userData.uid && (
                <>
                  ·
                  <a
                    className="text-xs text-brand pl-0.5 cursor-pointer"
                    onClick={async () => {
                      setLoading(true);
                      await follow(authUser, user);
                      setLoading(false);
                    }}
                  >
                    Follow
                  </a>
                </>
              )}
          </div>
          <span className="text-[#8e8e8e] text-sm text-left">
            {user?.displayName}
          </span>
        </div>
      </div>
      {authUser.uid === userData.uid && (
        <div className="flex flex-col justify-between  pr-3">
          <button
            onClick={() => {
              setModal(true);
            }}
            className="text-black border relative border-[#dbdbdb] w-[71px] h-[30px] font-semibold  px-1 py-1 rounded  text-sm "
            type="button"
          >
            {loading ? (
              <img
                className="h-6 w-6 m-auto absolute inset-0"
                src="/img/loading-gray.svg"
                alt=""
              />
            ) : (
              "Remove"
            )}
          </button>
        </div>
      )}
      {authUser.following.find((el) => el.uid === user?.uid) &&
        authUser.uid !== userData.uid &&
        authUser.uid !== user.uid && (
          <div className="flex flex-col justify-between  pr-3 ">
            <button
              onClick={() => {
                setModal(true);
              }}
              className="text-black border relative border-[#dbdbdb] w-[71px] h-[30px] font-semibold  px-1 py-1 rounded  text-sm "
              type="button"
            >
              {loading ? (
                <img
                  className="h-6 w-6 m-auto absolute inset-0"
                  src="/img/loading-gray.svg"
                  alt=""
                />
              ) : (
                "Following"
              )}
            </button>
          </div>
        )}
      {!authUser.following.find((el) => el.uid === user?.uid) &&
        authUser.uid !== userData.uid &&
        authUser.uid !== user.uid && (
          <div className="flex flex-col justify-between  pr-3 ">
            <button
              onClick={async () => {
                setLoading(true);
                await follow(authUser, user);
                setLoading(false);
              }}
              className="text-white bg-brand border relative border-[#dbdbdb] w-[71px] h-[30px] font-semibold  px-1 py-1 rounded  text-sm "
              type="button"
            >
              {loading ? (
                <img
                  className="h-6 w-6 m-auto absolute inset-0"
                  src="/img/loading-gray.svg"
                  alt=""
                />
              ) : (
                "Follow"
              )}
            </button>
          </div>
        )}
      {modal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={modalRef}
            className="relative w-5/12 max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="flex flex-col items-center justify-center p-5 border-b rounded-t space-y-1">
                <img
                  src={user?.photoURL || "/img/no-avatar.jpeg"}
                  alt=""
                  className="w-[90px] h-[90px] rounded-full mb-5"
                />
                <h2 className="text-[22px] font-light">Remove follower?</h2>
                <p className="text-gray-900 text-sm text-center ">
                  Instagram won't tell {user?.username} they were removed from
                  your followers.
                </p>
              </div>

              <div
                onClick={async () => {
                  setModal(false);
                  setLoading(true);
                  await unfollower(authUser, user);
                  setLoading(false);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Remove
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
    </li>
  );
}

export default Friend;
