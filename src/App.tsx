import { Fragment, useEffect, useState } from "react";
import { DATA_CENTER_TOKEN, useApp } from "./context/AppContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";
import { Loader } from "./components/Loader";
import LandingPages from "./Pages/Landing/Index";
import AuthPages from "./Pages/Authentication/Index";
import RouteLayout from "./layout/RouteLayout";
import DashboardPages from "./Pages/Workspace/Index";
import PersonaPages from "./Pages/Persona/Index";
import TemplatePages from "./Pages/Template/Index";
import SavedProfilePages from "./Pages/SavedProfiles/Index";
import SocialpalPages from "./Pages/SocialPal/Index";

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
                  path="/app/persona"
                  element={<PersonaPages.PersonaMgt />}
                />
                <Route
                  path="/app/persona/add-persona"
                  element={<PersonaPages.AddPersona />}
                />
                <Route
                  path="/app/persona/edit-persona"
                  element={<PersonaPages.EditPersona />}
                />
                <Route
                  path="/app/persona/manage-tags"
                  element={<PersonaPages.ManageTags />}
                />
                <Route
                  path="/app/settings"
                  element={<DashboardPages.AccountSettings />}
                />
                <Route
                  path="/app/subscription"
                  element={<DashboardPages.SubPricing />}
                />
                <Route
                  path="/app/settings/teams/activity-report"
                  element={<DashboardPages.ActivityReport />}
                />
                <Route
                  path="/app/templates"
                  element={<TemplatePages.AllTemplates />}
                />
                <Route
                  path="/app/templates/new-template"
                  element={<TemplatePages.NewTemplate />}
                />
                <Route
                  path="/app/templates/edit-template"
                  element={<TemplatePages.EditTemplate />}
                />
                <Route
                  path="/app/saved-profiles"
                  element={<SavedProfilePages.SavedProfiles />}
                />
                <Route
                  path="/app/saved-profiles/manage-list"
                  element={<SavedProfilePages.ManageList />}
                />
              </Route>

              {/* SOCIAL PAL PAGES */}
              <Route
                path="/app/profile-optimization"
                element={<SocialpalPages.LinkedinOptimization />}
              />
              {/* SOCIAL PAL PAGES */}
            </>
          </Routes>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
