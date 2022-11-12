import { useSelector } from "react-redux";
import Post from "./Post";
import { useEffect, useState } from "react";
import { getFeed } from "firebaseConfig";
function Feed() {
  const authUser = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    setPosts(
      (await getFeed(authUser.following, authUser.posts)).sort(
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
    <section className="space-y-3">
      {posts.map((post) => (
        <Post key={post.uid} post={post} authUser={authUser} />
      ))}
    </section>
  );
}

export default Feed;
