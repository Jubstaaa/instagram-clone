import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Edit() {
  return (
    <div className="grid grid-cols-4 h-[930px] bg-white">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Edit;
