import AuthLayout from "pages/auth";
import Home from "pages/home";
import Login from "pages/auth/login";
import Register from "pages/auth/register";
import Password from "pages/auth/password";
import Profile from "pages/profile";
import PrivateRoute from "components/PrivateRoute";
import Layout from "pages/layout";
import Posts from "pages/profile/posts";
import PostDetails from "pages/profile/postDetails";
import EditProfile from "pages/profile/edit";
import Tagged from "pages/profile/tagged";
import Edit from "pages/profile/Components/Edit";
import ProfileNotFound from "pages/profile/not-found";
import EditForm from "pages/profile/Components/EditForm";
import ChangePassword from "pages/profile/Components/ChangePassword";
const routes = [
  {
    path: "/",
    element: <Layout />,
    auth: true,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":user/:postId",
        element: <PostDetails />,
      },
      {
        path: "/:user",
        element: <Profile />,
        auth: true,
        children: [
          {
            index: true,
            element: <Posts />,
          },
          {
            path: "tagged",
            element: <Tagged />,
          },
        ],
      },
      {
        path: "accounts",
        element: <EditProfile />,
        auth: true,
        children: [
          {
            index: true,
            element: <ProfileNotFound />,
          },
          {
            path: "edit",
            element: <Edit />,
            children: [
              {
                index: true,
                element: <EditForm />,
              },
              {
                path: "password",
                element: <ChangePassword />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <ProfileNotFound />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "password",
        element: <Password />,
      },
    ],
  },
  {
    path: "*",
    element: <ProfileNotFound />,
  },
];

const authCheck = (routes) =>
  routes.map((route) => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.children) {
      route.children = authCheck(route.children);
    }
    return route;
  });

export default authCheck(routes);
