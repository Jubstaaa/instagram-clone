import Header from "components/Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto pt-4">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
