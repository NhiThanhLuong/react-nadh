import "./App.less";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";

import { Loading, PrivateRoute } from "shared_components";
import { storage } from "_constants";
import useNav from "hooks/useNav";

const DefaultLayout = lazy(() => import("layouts/DefaultLayout"));
const Login = lazy(() => import("containers/Login"));

function App() {
  const navs = useNav(true);
  const renderRoutes = () => {
    return navs.map(nav => (
      <Route
        key={nav.key}
        path={nav.key}
        element={<PrivateRoute>{nav.component()}</PrivateRoute>}
      />
    ));
  };
  return (
    <div className="App">
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<ContainerLayout />}>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DefaultLayout />
                  </PrivateRoute>
                }
              >
                {renderRoutes()}
              </Route>
              <Route exact path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

function ContainerLayout() {
  // const { user_sent } = useSelector(state => state.auth);
  let { token } = storage;
  const navigate = useNavigate();
  const match = useMatch("/");

  useEffect(() => {
    // let user = localStorage[ACCESS_TOKEN];
    const token = localStorage.getItem(storage.token);

    // if (!user) navigate("/login");
    if (!token) navigate("/login");
    else {
      if (match) {
        navigate("/candidates");
      }
    }
  }, [match, navigate, token]);

  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <div>Không tìm thấy trang.</div>;
}

export default App;
