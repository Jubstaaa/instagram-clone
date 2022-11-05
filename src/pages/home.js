import Header from "components/Header";
import React from "react";
import Feed from "components/Feed";
import StoryBoard from "components/StoryBoard";
import Sidebar from "components/Sidebar";
function Home() {
  return (
    <>
      <main>
        <div className="max-w-[53rem] mx-auto lg:flex mb-10">
          <div className="space-y-3 lg:mx-0">
            <StoryBoard />
            <Feed />
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
}

export default Home;
