import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import ProfileNotFound from "./not-found";
import { getUserInfo, getPostInfo, getComments } from "firebaseConfig";

import ExactPost from "./Components/ExactPost";

function PostDetails() {
  const authUser = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(null);
  const [post, setPost] = useState(null);
  const { user, postId } = useParams();
  const [comments, setComments] = useState([]);
  const [force, setForce] = useState(false);

  useEffect(() => {
    getUserInfo(user)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        setUserData(false);
      });
  }, [user, authUser]);

  useEffect(() => {
    getPostInfo(user, postId)
      .then((res) => {
        setPost(res);
      })
      .catch((err) => {
        setPost(false);
      });
  }, [postId, comments]);

  useEffect(() => {
    getComments(user, postId)
      .then((res) => {
        setComments([...res].sort((b, a) => a.date - b.date));
      })
      .catch((err) => {
        console.log(err);

        setComments(false);
      });
  }, [force]);

  if (userData === null || post === null || comments === null) {
    return <Loader />;
  }
  if (userData === false || post === false || comments === false) {
    return <ProfileNotFound />;
  }

  return (
    <ExactPost
      post={post}
      userData={userData}
      comments={comments}
      authUser={authUser}
      force={force}
      setForce={setForce}
    />
  );
}

export default PostDetails;
