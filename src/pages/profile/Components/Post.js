import { useRef, useState, useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import PostModal from "./PostModal";
function Post({ post, user }) {
  const [postModal, setPostModal] = useState(false);
  const modalRef = useRef(null);
  const [comments, setComments] = useState([...post.comments]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPostModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    setComments([...post.comments].sort((b, a) => a.date - b.date));
  }, [post.comments]);

  return (
    <>
      <div
        onClick={() => {
          setPostModal(true);
        }}
        className="w-72 h-72 relative col-span-1 group cursor-pointer"
      >
        <img
          className="object-cover w-full h-full	"
          src={post.file.url}
          alt={post.alt}
        />
        <div className="absolute hidden group-hover:flex justify-center items-center space-x-5 inset-0 w-full h-full bg-black/40 ">
          <div className="flex items-center justify-center space-x-2">
            <FaHeart className="text-white w-5 h-5" />
            <span className="text-white font-semibold">
              {post?.likes?.length}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaComment className="text-white w-5 h-5" />
            <span className="text-white font-semibold">
              {post?.comments?.length}
            </span>
          </div>
        </div>
      </div>
      {postModal && (
        <PostModal
          setPostModal={setPostModal}
          post={post}
          user={user}
          comments={comments}
        />
      )}
    </>
  );
}

export default Post;
