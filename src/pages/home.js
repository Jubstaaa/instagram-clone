import Feed from "components/Feed";
import Sidebar from "components/Sidebar";
import { Helmet } from "react-helmet";
function Home() {
  return (
    <>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      <main>
        <div className="max-w-[53rem]  mx-auto lg:flex mb-10">
          <div className="space-y-3 lg:mx-0 w-auto">
            <Feed />
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
}

export default Home;
