import Icon from "components/Icon";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SavedPost from "./Components/SavedPost";

function Saved() {
  const [user] = useOutletContext();
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    if (user?.saved) {
      setSaved([...user.saved].reverse());
    }
  }, [user.saved]);

  return (
    <>
      {saved.length === 0 ? (
        <div className="flex justify-center flex-col items-center gap-4 pt-10">
          <div className="w-[62px] h-[62px] border-2 rounded-full border-black flex items-center justify-center">
            <Icon name="saved" size={34} />
          </div>
          <h6 className="text-[28px] font-light">Start Saving</h6>
          <p className="text-sm">Save photos and videos to your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-7 justify-center justify-items-center">
          {saved?.map((post) => (
            <SavedPost key={post.postUid} item={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default Saved;
