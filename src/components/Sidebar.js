import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Suggestion from "./Suggestion";
function Sidebar() {
  const user = useSelector((state) => state.auth.user);

  const getDifference = (array1, array2) => {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.uid === object2.uid;
      });
    });
  };

  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            <Link to={`/${user.username}`}>
              <img
                className="w-full"
                src={user.photoURL || "/img/no-avatar.jpeg"}
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to={`/${user.username}`}>
              <h2 className="font-semibold text-md">{user.username}</h2>
            </Link>
            <h3 className="opacity-50">{user.displayName}</h3>
          </div>
        </div>
        <button className={"sidebarButton"}>Switch</button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestions For You</h1>
        <button className={"sidebarButton !text-black"}>See All</button>
      </div>

      <div className="space-y-4">
        {getDifference(user.followers, user.following).map((item) => (
          <Suggestion key={item.uid} uid={item.uid} authUser={user} />
        ))}
      </div>
    </section>
  );
}

export default Sidebar;
