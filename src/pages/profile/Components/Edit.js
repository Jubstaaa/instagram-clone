import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";

function Edit() {
  return (
    <>
      <div className="grid grid-cols-4 sm:h-[930px] bg-white relative">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Edit;
