import Icon from "components/Icon";
function Saved() {
  return (
    <div className="flex justify-center flex-col items-center gap-4 pt-10">
      <div className="w-[62px] h-[62px] border-2 rounded-full border-black flex items-center justify-center">
        <Icon name="saved" size={34} />
      </div>
      <h6 className="text-[28px] font-light">Start Saving</h6>
      <p className="text-sm">Save photos and videos to your collection.</p>
    </div>
  );
}

export default Saved;
