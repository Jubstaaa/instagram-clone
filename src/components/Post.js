import Icon from "./Icon";
import { useState, useEffect, useRef } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import axios from "axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import { addComment, addLikes, removeLikes, deletePost } from "firebaseConfig";
import Likes from "pages/profile/Components/Likes";
import Comment from "pages/profile/Components/Comment";
import PostModal from "pages/profile/Components/PostModal";
import { toast } from "react-hot-toast";
import AddPost from "./AddPost";
import useClipboard from "react-use-clipboard";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

function Post({ post, authUser }) {
  const [title, setTitle] = useState(post.title);
  const [showTranslation, setShowTranslation] = useState(false);
  const [user] = useState(post?.user ? post.user : authUser);
  const [likesModal, setLikesModal] = useState(false);
  const likesRef = useRef(null);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const [postModal, setPostModal] = useState(false);
  const modalRef = useRef(null);
  const optionRef = useRef(null);
  const deleteRef = useRef(null);
  const [optionModal, setOptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareToModal, setShareToModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [copyLink, setCopyLink] = useClipboard(
    `${window.location.origin}/${user.username}/${post.uid}`
  );

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
    function handleClickOutside(event) {
      if (likesRef.current && !likesRef.current.contains(event.target)) {
        setLikesModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [likesRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setOptionModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setDeleteModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteRef]);

  const translateText = async () => {
    await axios
      .post(`https://libretranslate.de/detect`, {
        q: title,
      })
      .then((response) => {
        const sourceLanguage = response.data[0].language;
        let data = {
          q: title,
          source: sourceLanguage,
          target: sourceLanguage === "en" ? "tr" : "en",
          format: "text",
        };
        axios
          .post(`https://libretranslate.de/translate`, data)
          .then((response) => {
            setTitle(response.data.translatedText);
          });
      });
    setShowTranslation(true);
  };
  const originalText = () => {
    setTitle(post.title);
    setShowTranslation(false);
  };

  return (
    <div className="relative card ">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center -m-2">
            <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
              <img className="w-full" src={user.photoURL} alt="" />
            </div>
            <div>
              <Link to={`/${user.username}`}>
                <h2 className=" font-semibold">{user.username}</h2>
              </Link>
              {post.location && <p className="text-xs">{post.location}</p>}
            </div>
          </div>
          <BiDotsHorizontalRounded
            className="w-6 h-6 cursor-pointer text-[#8e8e8e]"
            onClick={() => {
              setOptionModal(true);
            }}
          />
        </div>
        <div className="relative -mx-5 aspect-square overflow-hidden flex justify-center items-center">
          {post.file.type.includes("image") && (
            <img className="w-full" src={post.file.url} alt={post.alt} />
          )}
          {post.file.type.includes("video") && (
            <video
              controls
              controlsList=" nodownload noremoteplayback  foobar "
              className="w-full h-full"
            >
              <source src={post.file.url} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-4">
              {post.likes.find((like) => like.uid === authUser.uid) ? (
                <Icon
                  className="cursor-pointer hover:opacity-50"
                  name="redHeart"
                  size={24}
                  onClick={() => {
                    removeLikes(user, post, authUser);
                  }}
                />
              ) : (
                <Icon
                  className="cursor-pointer hover:opacity-50"
                  name="heart"
                  size={24}
                  onClick={() => {
                    addLikes(user, post, authUser);
                  }}
                />
              )}
              <Icon
                className="cursor-pointer hover:opacity-50"
                name="comment"
                size={24}
                onClick={() => {
                  commentRef.current.focus();
                }}
              />
              <Icon
                className="cursor-pointer hover:opacity-50"
                name="share"
                size={24}
              />
            </div>
            <Icon
              className="cursor-pointer hover:opacity-50"
              name="bookmark"
              size={24}
            />
          </div>
          {post?.likes?.length === 0 ? (
            <span>
              Be the first to
              <span
                onClick={() => {
                  addLikes(user, post, authUser);
                }}
                className=" font-semibold cursor-pointer"
              >
                {" "}
                like this
              </span>
            </span>
          ) : post?.likes?.length === 1 ? (
            <span
              onClick={() => {
                setLikesModal(true);
              }}
              className="text-sm font-semibold cursor-pointer"
            >
              {post.likes.length} like
            </span>
          ) : (
            <span
              onClick={() => {
                setLikesModal(true);
              }}
              className="text-sm font-semibold cursor-pointer"
            >
              {post.likes.length} likes{" "}
            </span>
          )}
          {post.title && (
            <p className="text-sm">
              <Link to={`/${user.username}`}>
                <span className="font-semibold">{user.username} </span>
              </Link>
              {title}
            </p>
          )}
          {post?.comments.length < 3 ? (
            post?.comments.map((comment) => (
              <Comment
                key={comment.uid}
                comment={comment}
                post={post}
                authUser={authUser}
                userData={user}
                type="feed"
              />
            ))
          ) : (
            <p
              className="text-sm text-[#8e8e8e] cursor-pointer"
              onClick={() => {
                setPostModal(true);
              }}
            >
              View all {post?.comments.length} comments
            </p>
          )}

          <h3 className="text-xs text-gray-500">
            <TimeAgo date={post.date} />
            {post.title && (
              <span
                onClick={showTranslation ? originalText : translateText}
                className="text-black font-semibold text-xs cursor-pointer mx-2"
              >
                {showTranslation ? "See Original" : "See Translation"}
              </span>
            )}
          </h3>
        </div>

        <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

        <div className="flex gap-4 items-center">
          <Icon className="cursor-pointer " name="emoji" size={30} />
          <input
            ref={commentRef}
            className="w-full border-[1px] border-none  focus:outline-none p-2 resize-none"
            type="text"
            placeholder="Add a comment..."
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            disabled={!comment}
            className=" text-brand disabled:opacity-60 "
            onClick={async () => {
              await addComment(comment, user, post, authUser);
              setComment("");
            }}
          >
            Post
          </button>
        </div>
      </div>

      {likesModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={likesRef}
            className="relative w-[400px]  h-[400px]  max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="p-3  border-b  text-center  flex justify-between items-center">
                <div></div>
                <span className="  font-semibold leading-relaxed">
                  Following
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setLikesModal(false);
                  }}
                >
                  <Icon name="close" size={18} />
                </div>
              </div>

              <ul className=" text-center min-h-[250px] max-h-[350px] overflow-auto relative ">
                {post?.likes?.map((user) => (
                  <Likes
                    key={user.uid}
                    uid={user.uid}
                    authUser={authUser}
                    setLikesModal={setLikesModal}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {postModal && (
        <PostModal
          setPostModal={setPostModal}
          post={post}
          user={user}
          comments={post.comments}
        />
      )}
      {optionModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={optionRef}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              {user.uid === authUser.uid && (
                <>
                  <div
                    onClick={async () => {
                      setOptionModal(false);
                      setDeleteModal(true);
                    }}
                    className="p-3 space-y-6 border-b  text-center cursor-pointer"
                  >
                    <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                      Delete
                    </span>
                  </div>
                  <div
                    className="p-3 space-y-6  border-b   text-center cursor-pointer"
                    onClick={() => {
                      setOptionModal(false);
                    }}
                  >
                    <span
                      onClick={() => {
                        setEditModal(true);
                      }}
                      className="text-black text-sm font-normal leading-relaxed"
                    >
                      Edit
                    </span>
                  </div>
                </>
              )}

              <div
                className="p-3 space-y-6   border-b  text-center cursor-pointer"
                onClick={() => {
                  setOptionModal(false);
                }}
              >
                <Link
                  to={`/${user.username}/${post.uid}`}
                  className="text-black text-sm font-normal leading-relaxed"
                >
                  Go to post
                </Link>
              </div>
              <div
                className="p-3 space-y-6   border-b  text-center cursor-pointer"
                onClick={() => {
                  setOptionModal(false);
                  setShareToModal(true);
                }}
              >
                <span className="text-black text-sm font-normal leading-relaxed">
                  Share to...
                </span>
              </div>
              <div
                className="p-3 space-y-6   border-b  text-center cursor-pointer"
                onClick={() => {
                  setOptionModal(false);
                }}
              >
                <span
                  onClick={(e) => {
                    setCopyLink(e);
                    setOptionModal(false);
                    toast.success("Link copied to clipboard.");
                  }}
                  className="text-black text-sm font-normal leading-relaxed"
                >
                  Copy link
                </span>
              </div>
              <div
                className="p-3 space-y-6   text-center cursor-pointer"
                onClick={() => {
                  setOptionModal(false);
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
      {deleteModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={deleteRef}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="flex flex-col items-center justify-center p-5 border-b rounded-t ">
                <h3 className="text-gray-900 text-lg font-semibold ">
                  Delete post?
                </h3>
                <p className="text-sm text-[#8e8e8e]">
                  Are you sure you want to delete this post?
                </p>
              </div>

              <div
                onClick={() => {
                  deletePost(user, post, authUser);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Delete
                </span>
              </div>
              <div
                className="p-3 space-y-6   text-center cursor-pointer"
                onClick={() => {
                  setDeleteModal(false);
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
      {shareToModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={deleteRef}
            className="relative w-[400px] h-[400px] max-h-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="p-3  border-b  text-center  flex justify-between items-center">
                <div></div>
                <span className="  font-semibold leading-relaxed">
                  Share to...
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShareToModal(false);
                  }}
                >
                  <Icon name="close" size={18} />
                </div>
              </div>

              <div className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50">
                <Icon name="share" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Share to Direct
                </span>
              </div>
              <FacebookShareButton
                url={`${window.location.origin}/${user.username}/${post.uid}/`}
                resetButtonStyle={false}
                className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
              >
                <Icon name="facebook" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Share to Facebook
                </span>
              </FacebookShareButton>
              <FacebookMessengerShareButton
                url={`${window.location.origin}/${user.username}/${post.uid}/`}
                resetButtonStyle={false}
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50 a"
              >
                <Icon name="direct" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Share to Messenger
                </span>
              </FacebookMessengerShareButton>
              <TwitterShareButton
                url={`${window.location.origin}/${user.username}/${post.uid}/`}
                resetButtonStyle={false}
                title={`See this Instagram Clone photo by @${user.username}`}
                hashtags={["winniesoft", "instagramclone", "reactjs"]}
                className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
              >
                <Icon name="twitter" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Share to Twitter
                </span>
              </TwitterShareButton>
              <EmailShareButton
                url={`${window.location.origin}/${user.username}/${post.uid}/`}
                resetButtonStyle={false}
                subject={`See this Instagram Clone photo by @${user.username}`}
                body={`See this Instagram Clone photo by @${user.username}`}
                className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
              >
                <Icon name="mail" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Share via Email
                </span>
              </EmailShareButton>
              <div
                onClick={(e) => {
                  setCopyLink(e);
                  setShareToModal(false);
                  toast.success("Link copied to clipboard.");
                }}
                className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
              >
                <Icon name="link" size={24} />
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Copy link
                </span>
              </div>
              <div
                onClick={() => {
                  setShareToModal(false);
                }}
                className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
              >
                <div className="w-6 h-6"></div>
                <span className="text-black text-sm font-semibold leading-relaxed">
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <AddPost
          type="edit"
          fileRef={post.file}
          post={post}
          user={user}
          setModal={setEditModal}
        />
      )}
    </div>
  );
}

export default Post;
