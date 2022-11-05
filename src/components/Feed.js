import { posts } from "./Data";

import Post from "./Post";

function Feed() {
  return (
    <section className="space-y-3">
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </section>
  );
}

export default Feed;
