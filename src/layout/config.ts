import React from "react";
import icons from "./navIcons";

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

//route path
export const ROUTES_CONFIG = {
  admin: {
    name: "Admin",
    path: "/app/admins",
    entities: {
      dashboard: "/app/admins/dashboards/school",
      students: "/app/admins/users/students",
      newStudent: "/app/admins/users/students/new",
      editStudent: "/app/admins/users/students/edit",
      employees: "/app/admins/users/employees",
      newEmployee: "/app/admins/users/employees/new",
      parents: "/app/admins/users/parents",
      newParent: "/app/admins/users/parents/new",
      editEmployee: "/app/admins/users/employees/edit",
      classes: "/app/admins/academics/classes",
      newClasses: "/app/admins/academics/classes/new",
      editClasses: "/app/admins/academics/classes/edit",
      questions: "/app/admins/academics/questions",
      newQuestions: "/app/admins/academics/questions/new",
      evaluations: "/app/admins/academics/evaluations",
      newEvaluations: "/app/admins/academics/evaluations/new",
      subjects: "/app/admins/academics/subjects",
      newSubjects: "/app/admins/academics/subjects/new",
      attendance: "/app/admins/academics/attendances",
      newAttendance: "/app/admins/academics/attendances/new",
      payments: "/app/admins/accounts/payments",
      addPayments: "/app/admins/accounts/payments/new",
      expenses: "/app/admins/accounts/expenses",
      addExpenses: "/app/admins/accounts/expenses/new",
      payrolls: "/app/admins/accounts/payrolls",
      addpayroll: "/app/admins/accounts/payrolls/new",
      salaries: "/app/admins/accounts/salaries",
      updateSchool: "/app/admins/settings/profile/schools/new",
      schools: "/app/admins/settings/profile/schools",
      school: "/app/admins/settings/profile/schools/school",
      general: "/app/admins/settings/profile/schools/general",
      credentials: "/app/admins/settings/profile/schools/credentials",
      notifications: "/app/admins/settings/profile/schools/notifications",
      support: "/app/admins/settings/profile/schools/support",
      billing: "/app/admins/settings/profile/schools/billing",
      customization: "/app/admins/settings/profile/schools/customization",
      preference: "/app/admins/settings/profile/schools/preference",
      grading: "/app/admins/settings/profile/schools/grading",
      update: "/app/admins/settings/profile/schools/update",
      resetpassword: "/app/admins/settings/profile/schools/resetpassword",
    },
  },
  teacher: {
    name: "Teacher",
    path: "/app/teacher",
    entities: {
      students: "/app/teacher/users/students",
      teachers: "/app/teacher/users/teachers",
      classes: "/app/teacher/academics/classes",
      subjects: "/app/teacher/academics/subjects",
      attendance: "/app/teacher/academics/attendances",
      questions: "/app/admins/academics/questions",
    },
  },
  student: {
    name: "Student",
    path: "/app/students",
    entities: {},
  },
};

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
        path: "/app/workspace/saved-profiles", //use for nested rendering
        icon: icons.Users,
        fillIcon: icons.UsersFill,
      },
      {
        name: "Persona Management",
        path: "/app/workspace/saved-profiles", //use for nested rendering
        icon: icons.User,
        fillIcon: icons.UserFill,
      },
      {
        name: "Template Management",
        path: "/app/workspace/saved-profiles", //use for nested rendering
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
        name: "Home",
        path: "/app/home", //use for nested rendering
        icon: icons.Home,
      },
      {
        name: "Dashboard",
        path: "/app/students/dashboard", //use for nested rendering
        icon: icons.Dashboard,
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
      },
      {
        name: "Application Builder",
        path: "/app/tutors/dashboard", //use for nested rendering
        icon: icons.Dashboard,
      },
    ],
  },
];

//Students navigation
export const SOCIAL_NAV_DATA = [
  // MENU
  {
    children: [
      {
        name: "Linkedin Optimization",
        path: "/app/home", //use for nested rendering
        icon: icons.Home,
      },
      {
        name: "Banner Maker",
        path: "/app/organization/dashboard", //use for nested rendering
        icon: icons.Dashboard,
      },
    ],
  },
];
