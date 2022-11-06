import { useState, useEffect } from "react";
import { getFriendInfo } from "firebaseConfig";
import Following from "./Following";
function Likes({ uid, authUser, setLikesModal }) {
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
    <>
      {authUser.following.find((following) => following.uid === uid) ? (
        <Following
          key={user.uid}
          uid={user.uid}
          authUser={authUser}
          setFollowingModal={setLikesModal}
        />
      ) : (
        <Following
          key={user.uid}
          uid={user.uid}
          authUser={authUser}
          setFollowingModal={setLikesModal}
          type="follow"
        />
      )}
    </>
  );
}

export default Likes;
