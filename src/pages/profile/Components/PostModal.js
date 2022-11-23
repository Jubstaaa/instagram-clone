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
    <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
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
