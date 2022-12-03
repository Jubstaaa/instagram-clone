import { useSelector } from "react-redux";
import ExactPost from "./ExactPost";

function PostModal({
  setPostModal,
  post,
  user,
  comments,
  setForce = null,
  force = null,
}) {
  const authUser = useSelector((state) => state.auth.user);

  return (
    <div className="darkModal">
      <ExactPost
        post={post}
        userData={user}
        comments={comments}
        authUser={authUser}
        setPostModal={setPostModal}
        setForce={setForce}
        force={force}
      />
    </div>
  );
}

export default PostModal;
