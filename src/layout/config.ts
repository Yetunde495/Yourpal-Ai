import React from "react";
import icons from "./navIcons";
import { Icons } from "../components/icons";

interface INavChild {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: INavChild[];
}
export interface ISidebarNav {
  section: string;
  children: INavChild[];
}



//Admin navigation
export const HOME_NAV_DATA = [
  // MENU
  {
    children: [
      {
        name: "Workspace",
        path: "/app/workspace", //use for nested rendering
        icon: icons.Dashboard,
        fillIcon: icons.DashboardFill,
      },
      {
        name: "Saved Profiles",
        path: "/app/saved-profiles", //use for nested rendering
        icon: icons.Users,
        fillIcon: icons.UsersFill,
      },
      {
        name: "Persona Management",
        path: "/app/persona", //use for nested rendering
        icon: icons.User,
        fillIcon: icons.UserFill,
      },
      {
        name: "Template Management",
        path: "/app/templates", //use for nested rendering
        icon: icons.Template,
        fillIcon: icons.TemplateFill,
      },
    ],
  },
];

//Students navigation
export const JOBSEEKER_NAV_DATA = [
  // MENU
  {
    children: [
      {
        name: "Job Hub",
        path: "/app/jobseeker", //use for nested rendering
        icon: icons.Home,
        fillIcon: icons.HomeFill,
      },
      {
        name: "Resume Builder",
        path: "/app/resume-builder", //use for nested rendering
        icon: icons.Resume,
        fillIcon: icons.ResumeFill
      },
      {
        name: "ATS",
        path: "/app/students/dashboard", //use for nested rendering
        icon: icons.Resume,
        fillIcon: icons.ResumeFill
      },
    ],
  },
];

//Students navigation
export const RECRUITER_NAV_DATA = [
  // MENU
  {
    children: [
      {
        name: "Talent Hub",
        path: "/app/recruiter", //use for nested rendering
        icon: icons.Home,
        fillIcon: icons.HomeFill,
      },
      {
        name: "Application Builder",
        path: "/app/tutors/dashboard", //use for nested rendering
        icon: icons.Dashboard,
        fillIcon: icons.DashboardFill,
        children: [
          {
            name: "Tailor Applicant",
            path: "/app/recruiter/application-builder/:id",
            icon: Icons.bolt,
          },
          {
            name: "Branding Kit",
            path: "/app/recruiter/branding/:id",
            icon: Icons.star,
          },
          {
            name: "Evaluation Criteria",
            // path: "/app/tutors/dashboard/manage",
            icon: Icons.draft,
            toggle: true,
          },
          {
            name: "AI-Interview Question",
            path: "/app/tutors/dashboard/manage",
            icon: Icons.question,
            toggle: true,
          },
          {
            name: "Personal Information",
            path: "/app/tutors/dashboard/manage",
            icon: Icons.personInfo,
            toggle: true,
          },
        ],
      },
    ],
  },
];

//SocialPal Pages
export const SOCIAL_NAV_DATA = [
  // MENU
  {
    children: [
      {
        name: "Linkedin Optimization",
        path: "/app/profile-optimization", //use for nested rendering
        icon: icons.Optimize,
        fillIcon: icons.OptimizeFill
      },
      {
        name: "Banner Maker",
        path: "/app/organization/dashboard", //use for nested rendering
        icon: icons.Banner,
        fillIcon: icons.Banner
      },
    ],
  },
];
