// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Unarchive from "@material-ui/icons/Unarchive";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import EditorList from "views/EditorList/EditorList.jsx";
import IEditor from "views/IEditor/IEditor.jsx";
import TableList from "views/TableList/TableList.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";
// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import EditorClassList from "./views/EditorClassList/EditorClassList";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
      // rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "標籤管理",
    // rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path     : "/editorList",
    name     : "文章列表",
    // rtlName  : "قائمة الجدول",
    icon     : "content_paste",
    component: EditorList,
    layout   : "/admin",
  },
  {
    path     : "/editorClassList",
    name     : "文章分類管理",
    // rtlName  : "قائمة الجدول",
    icon     : "content_paste",
    component: EditorClassList,
    layout   : "/admin",
  },
  {
    path     : "/editorList/edit/new",
    name     : "新增文章",
    // rtlName  : "قائمة الجدول",
    icon     : "content_paste",
    component: IEditor,
    layout   : "/admin",
    hide: false
  },
    {
    path: "/login-page",
    name: "Login Page",
    // rtlName: "پشتیبانی از راست به چپ",
    icon: Login,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    // rtlName: "پشتیبانی از راست به چپ",
    icon: Register,
    component: RegisterPage,
    layout: "/auth"
  }
];

export default dashboardRoutes;
