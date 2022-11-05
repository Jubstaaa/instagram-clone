import Icon from "components/Icon";
function NoPeople({ title, desc }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 absolute inset-0 ">
      <Icon name="follower" size={96} />
      <h2 className="text-base font-light text-[22px] ">{title}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

export default NoPeople;
