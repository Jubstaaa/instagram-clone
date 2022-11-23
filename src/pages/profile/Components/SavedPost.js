import Post from "./Post";
import { getUserDetails, getPostInfo } from "firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";

function SavedPost({ item }) {
  const [userData, setUserData] = useState(undefined);
  const [post, setPost] = useState(undefined);
  const [force, setForce] = useState(false);

  const getUser = async () => {
    setUserData(await getUserDetails(item?.userUid));
  };
  const getPost = async () => {
    setPost(await getPostInfo(userData?.username, item?.postUid));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getPost();
  }, [userData, force]);

  if (userData === undefined || post === undefined) {
    return <></>;
  }

  return (
    <Post
      key={post?.uid}
      post={post}
      user={userData}
      setForce={setForce}
      force={force}
    />
  );
}

export default SavedPost;
