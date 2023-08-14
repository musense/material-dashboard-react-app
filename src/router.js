import { createBrowserRouter } from "react-router-dom";
import Auth from "layouts/Auth";
import Admin from "layouts/Admin";
import EditorClassList from "views/EditorClassList";
import EditorList from "views/EditorList";
import NewIEditor from "views/IEditor";
import IEditor from "views/IEditor/[id]";
import LoginPage from "views/Pages/LoginPage";
import RegisterPage from "views/Pages/RegisterPage";
import TagList from "views/TagList";
import BannerManager from "views/BannerManager";
import { instance } from "api/saga/AxiosInstance";

const router = createBrowserRouter([
    {
        path: "/", element: <Auth />, children: [
            { path: "login", element: <LoginPage />, },
            { path: "register", element: <RegisterPage />, },
        ],
    },
    {
        path: "/admin", element: <Admin />, children: [
            { path: "banner", element: <BannerManager /> },
            { path: "tag", element: <TagList /> },
            { path: "editorClassList", element: <EditorClassList /> },
            {
                path: "editorList", children: [
                    { index: true, element: <EditorList /> },
                    { path: "new", element: <NewIEditor /> },
                    {
                        path: ":id", element: <IEditor />, loader: async ({ params, request: { signal } }) => {
                            const res = await instance.get(`/editor/${params.id}`, { signal })

                            console.log("🚀 ~ file: router.js:33 ~ path: id element:<IEditor/>,loader: ~ res.data:", res.data)
                            return res.data
                        }
                    },
                ]
            },
        ],
    }
]);

export default router;