import { lazy } from "react";

// Auth Routes
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

// User Routes
const Dashboard = lazy(() => import("./pages/User/Dashboard"));
const Scan = lazy(() => import("./pages/User/Scan"));
const History = lazy(() => import("./pages/User/History"));

type Route = {
  path: string;
  Component: React.ComponentType;
};

type Routes = Route[];

export const AuthRoutes: Routes = [
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
];

export const UserRoutes: Routes = [
  {
    path: "",
    Component: Dashboard,
  },
  {
    path: "scan",
    Component: Scan,
  },
  {
    path: "history",
    Component: History,
  },
];
