import { Fragment, useEffect, useState } from "react";
import { DATA_CENTER_TOKEN, useApp } from "./context/AppContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";
import { Loader } from "./components/Loader";
import LandingPages from "./Pages/Landing/Index";
import AuthPages from "./Pages/Authentication/Index";
import RouteLayout from "./layout/RouteLayout";
import DashboardPages from "./Pages/Workspace/Index";

axios.defaults.baseURL = "";

function App() {
  const { signOut, loadData } = useApp();
  const [loading, setLoading] = useState(false);
  const preloader = document.getElementById("preloader");

  axios.interceptors.request.use(
    (axiosConfig) => {
      const token = localStorage.getItem(DATA_CENTER_TOKEN);
      axiosConfig.headers.Authorization = `Bearer ${token}`;
      return axiosConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error?.response?.status === 401) {
          signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = "none";
        setLoading(false);
      }, 100);
    }

    //
  }, [preloader]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <>
              <Route path="/" element={<LandingPages.Homepage />} />
              <Route path="/signin" element={<AuthPages.Signin />} />
              <Route path="/signup" element={<AuthPages.Signup />} />
              <Route
                path="/forgot-password"
                element={<AuthPages.ResetPassword />}
              />
              <Route
                path="/reset-password/:email/:token"
                element={<AuthPages.ResetPasswordForm />}
              />
            </>

            <>
              <Route path="/app" element={<RouteLayout />}>
                <Route
                  path="/app/workspace"
                  element={<DashboardPages.Workspace />}
                />
                <Route
                  path="/app/recruiter"
                  element={<DashboardPages.Recruitment />}
                />
                <Route
                  path="/app/workspace/persona"
                  element={<DashboardPages.PersonaMgt />}
                />
                <Route
                  path="/app/workspace/persona/add-persona"
                  element={<DashboardPages.AddPersona />}
                />
                <Route
                  path="/app/workspace/persona/manage-tags"
                  element={<DashboardPages.ManageTags />}
                />
                <Route
                  path="/app/settings"
                  element={<DashboardPages.AccountSettings />}
                />
              </Route>
            </>
          </Routes>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
