import { useEffect, useState } from "react";
import { getFriendInfo } from "firebaseConfig";
import { Link } from "react-router-dom";
import { follow } from "firebaseConfig";
function Suggestion({ uid, authUser }) {
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
    <div key={user.ui} className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Link to={`/${user.username}`}>
          <div className="rounded-full overflow-hidden w-8 h-8 cursor-pointer">
            <img
              className="w-full"
              src={user.photoURL || "/img/no-avatar.jpeg"}
              alt={user.username}
            />
          </div>
        </Link>
        <div className="text-xs">
          <Link to={`/${user.username}`}>
            <h3 className="font-semibold text-sm">{user.username}</h3>
          </Link>
          <h4 className="opacity-50">{user.displayName}</h4>
        </div>
      </div>

      <button
        onClick={() => {
          follow(authUser, user);
        }}
        className={"sidebarButton"}
      >
        Follow
      </button>
    </div>
  );
}

export default Suggestion;
