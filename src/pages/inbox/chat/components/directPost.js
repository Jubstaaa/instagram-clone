import { useEffect, useState } from "react";
import { getUserInfo } from "firebaseConfig";
import { Link } from "react-router-dom";
function DirectPost({ post, chatRef }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserInfo(post.username)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        setUserData(false);
      });
  }, [post.username]);

  useEffect(() => {
    setTimeout(() => {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 500);
  }, []);

  return (
    <div className="relative card h-full w-full ">
      <div className="flex flex-col space-y-4 ">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center -m-2">
            <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
              <img className="w-full" src={userData?.photoURL} alt="" />
            </div>
            <div>
              <Link to={`/${userData?.username}`}>
                <h2 className=" font-semibold">{userData?.username}</h2>
              </Link>
              {post.location && <p className="text-xs">{post.location}</p>}
            </div>
          </div>
        </div>
        <Link
          to={`/${userData?.username}/${post.uid}`}
          className="relative -mx-5 aspect-square overflow-hidden flex justify-center items-center bg-black cursor-pointer "
        >
          {post.file.type.includes("image") && (
            <img
              className="h-full object-scale-down"
              src={post.file.url}
              alt={post.alt}
            />
          )}
          {post.file.type.includes("video") && (
            <video className="w-full h-full">
              <source src={post.file.url} type="video/mp4" />
            </video>
          )}
        </Link>
      </div>
    </div>
  );
}

export default DirectPost;
