import { useRoutes } from "react-router-dom";
import routes from "routes";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import { useEffect } from "react";
import { checkDeletedUsers } from "firebaseConfig";

function App() {
  const user = useSelector((state) => state.auth.user);
  const showRoutes = useRoutes(routes);

  useEffect(() => {
    if (user) {
      checkDeletedUsers(user);
    }
  }, [user]);

  if (user === null) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      {showRoutes}
    </>
  );
}

export default App;
