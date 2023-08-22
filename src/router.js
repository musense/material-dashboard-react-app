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
import { useDispatch } from "react-redux";
import bannerListGetter from "utils/bannerListGetter";
import { RouterProvider } from "react-router-dom";

function RouterIndex() {
    const dispatch = useDispatch();
    const router = createBrowserRouter([
        {
            path: "/", element: <Auth />, children: [
                { path: "login", element: <LoginPage />, },
                { path: "register", element: <RegisterPage />, },
            ],
        },
        {
            path: "/admin", element: <Admin />, children: [
                // {
                //     path: "banner",
                //     element: <BannerManager />,
                //     loader: bannerListGetter(dispatch)
                // },
                { path: "tag", element: <TagList /> },
                { path: "editorClassList", element: <EditorClassList /> },
                {
                    path: "editorList", children: [
                        { index: true, element: <EditorList /> },
                        { path: "new", element: <NewIEditor /> },
                        {
                            path: ":id", element: <IEditor />,
                            // loader: async ({ params, request: { signal } }) => {
                            //     const res = await instance.get(`/editor/${params.id}`, { signal })


                            //     return res.data
                            // }
                        },
                    ]
                },
            ],
        }
    ]);

    return <RouterProvider router={router} />;
}


export default RouterIndex