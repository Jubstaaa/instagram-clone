import Icon from "components/Icon";
import { useRef, useState, useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import PostModal from "./PostModal";
function Post({ post, user, setForce = null, force = null }) {
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
        className="w-28 h-28 sm:w-72 max-w-full sm:h-72 max-h-full  relative col-span-1 group cursor-pointer"
      >
        {post.file.type.includes("image") ? (
          <img
            className="object-cover w-full h-full	"
            src={post.file.url}
            alt={post.alt}
          />
        ) : (
          <>
            <video
              className="object-cover w-full h-full	"
              disablePictureInPicture
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar "
            >
              <source src={post.file.url} type="video/mp4" />
            </video>
            <Icon
              size={18}
              name="video"
              className="absolute top-0 right-0 m-2"
            />
          </>
        )}

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
          setForce={setForce}
          force={force}
        />
      )}
    </>
  );
}

export default Post;
