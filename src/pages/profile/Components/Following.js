import { useState, useEffect } from "react";
import { unfollow, getFriendInfo } from "firebaseConfig";
import { Link } from "react-router-dom";
function Following({
  uid,
  loading,
  setLoading,
  authUser,
  setFollowingModal,
  userData,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getFriendInfo(uid)
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
    <li key={user.uid} className="flex justify-between items-center">
      <div className="flex items-center justify-start space-x-2  py-2 pl-3 pr-1 ">
        <Link
          onClick={() => {
            setFollowingModal(false);
          }}
          to={`/${user.username}`}
          className=""
        >
          <img
            className="h-11 w-11 inline-block rounded-full "
            src={user.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />
        </Link>

        <div className="flex flex-col items-start justify-center">
          <Link
            onClick={() => {
              setFollowingModal(false);
            }}
            to={`/${user.username}`}
            className=""
          >
            <span className="font-semibold text-sm">{user.username}</span>
          </Link>

          <span className="text-[#8e8e8e] text-sm text-left">
            {user.displayName}
          </span>
        </div>
      </div>
      {authUser.uid === userData.uid && (
        <div className="flex flex-col justify-between  pr-3">
          <button
            onClick={async () => {
              setLoading(true);
              await unfollow(authUser, user);
              setLoading(false);
            }}
            className="text-black border relative border-[#dbdbdb] w-[114px] h-[30px] font-semibold  px-6 py-1 rounded  text-sm "
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
    </li>
  );
}

export default Following;
