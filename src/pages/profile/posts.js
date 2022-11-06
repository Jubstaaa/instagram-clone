import Icon from "components/Icon";
import { useOutletContext } from "react-router-dom";
import Post from "./Components/Post";
import { useEffect, useState } from "react";
function Posts() {
  const [user] = useOutletContext();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (user?.posts) {
      setPosts([...user.posts].sort((b, a) => a.date - b.date));
    }
  }, [user.posts]);

  return (
    <>
      {posts.length === 0 ? (
        <div className="flex justify-center flex-col items-center gap-4 pt-10">
          <div className="w-[62px] h-[62px] border-2 rounded-full border-black flex items-center justify-center">
            <Icon name="post" size={34} />
          </div>
          <h6 className="text-[28px] font-light">No Posts Yet</h6>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-7 justify-center justify-items-center">
          {posts.map((post) => (
            <Post key={post.uid} post={post} user={user} />
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
