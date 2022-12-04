import { useSelector } from "react-redux";
import Post from "./Post";
import { useEffect, useState } from "react";
import { getFeed } from "firebaseConfig";
import Icon from "./Icon";
function Feed() {
  const authUser = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    setPosts(
      (await getFeed(authUser?.following, authUser?.posts))?.sort(
        ({ date: a }, { date: b }) => b - a
      )
    );
  };

  useEffect(() => {
    getPosts();
  }, [authUser]);

  if (posts === null) {
    return <></>;
  }
  return (
    <section className="space-y-3 px-4">
      {posts.map((post) => (
        <Post key={post.uid} post={post} authUser={authUser} />
      ))}
      {posts.length <= 0 && (
        <div className="flex justify-center flex-col items-center gap-4 pt-10">
          <div className="w-[62px] h-[62px] border-2 rounded-full border-black flex items-center justify-center">
            <Icon name="follow" size={34} />
          </div>
          <h6 className="text-[28px] font-light">Start Follow</h6>
          <p className="text-sm">
            Follow people or create post to see new posts
          </p>
        </div>
      )}
    </section>
  );
}

export default Feed;
