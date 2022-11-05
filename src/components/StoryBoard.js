import React from "react";
import { stories } from "./Data";
function StoryBoard() {
  return (
    <section className="card flex gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      {stories.map((story) => {
        let username = story.username.split(" ").join("").toLowerCase();
        username =
          username.length <= 10 ? username : `${username.slice(0, 8)}...`;
        return (
          <div className="flex flex-col justify-between items-center gap-2 cursor-pointer">
            <div className="rounded-full overflow-hidden w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 p-1">
              <div className="rounded-full overflow-hidden h-14 ring-[2px] ring-white">
                <img className="w-full" src={story.image} alt={story.image} />
              </div>
            </div>
            <span className="text-xs">{username}</span>
          </div>
        );
      })}
    </section>
  );
}

export default StoryBoard;
