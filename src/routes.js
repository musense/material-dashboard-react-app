// @material-ui/icons
// import LocationOn from "@material-ui/icons/LocationOn";
// import Unarchive from "@material-ui/icons/Unarchive";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import EditorList from "views/EditorList";
import IEditor from "views/IEditor/[id]";
import TagList from "views/TagList";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import EditorClassList from "./views/EditorClassList";
import BannerManager from "./views/BannerManager";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "標籤管理",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/banner",
  //   name: "Banner管理",
  //   icon: "content_paste",
  //   component: BannerManager,
  //   layout: "/admin"
  // },
  {
    path: "/tag",
    name: "標籤管理",
    icon: "content_paste",
    component: TagList,
    layout: "/admin"
  },
  {
    path: "/editorClassList",
    name: "文章分類管理",
    icon: "content_paste",
    component: EditorClassList,
    layout: "/admin",
  },
  {
    path: "/editorList",
    name: "文章列表",
    icon: "content_paste",
    component: EditorList,
    layout: "/admin",
  },
  {
    path: "/editorList/new",
    name: "新增文章",
    icon: "content_paste",
    component: IEditor,
    layout: "/admin",
    hide: false
  },
  // {
  //   path: "/editorManager",
  //   name: "文章管理",
  //   icon: "content_paste",
  //   component: EditorManager,
  //   layout: "/admin",
  //   hide: false
  // },
  // {
  //   path: "/editorManager/news",
  //   name: "文章管理",
  //   icon: "content_paste",
  //   component: EditorManagerNews,
  //   layout: "/admin",
  //   hide: true
  // },
  // {
  //   path: "/editorManager/hot",
  //   name: "文章管理",
  //   icon: "content_paste",
  //   component: EditorManagerHot,
  //   layout: "/admin",
  //   hide: true
  // },
  // {
  //   path: "/editorManager/recommend",
  //   name: "文章管理",
  //   icon: "content_paste",
  //   component: EditorManagerRecommend,
  //   layout: "/admin",
  //   hide: true
  // },
  // {
  //   path: "/login-page",
  //   name: "Login Page",
  //   icon: Login,
  //   component: LoginPage,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register-page",
  //   name: "Register Page",
  //   icon: Register,
  //   component: RegisterPage,
  //   layout: "/auth"
  // }
];

export default dashboardRoutes;
