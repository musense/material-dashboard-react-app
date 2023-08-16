import React from 'react'
import { Routes, Route, BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import EditorList from 'views/EditorList'
import IEditor from 'views/IEditor/[id]'
import NewIEditor from 'views/IEditor'
import LoginPage from 'views/Pages/LoginPage';
import RegisterPage from 'views/Pages/RegisterPage';
import TagList from './views/TagList';
import EditorClassList from './views/EditorClassList';
import BannerManager from './views/BannerManager';
import useRefreshStayCurrentPage from 'hook/useRefreshStayCurrentPage';
import *  as GetEditorAction from "actions/GetEditorAction";
import { useDispatch } from 'react-redux';


function App() {
    const dispatch = useDispatch();

    const requestEditorByID = (id) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                data: id
            },
        });
    }
    useRefreshStayCurrentPage()
    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>

        // return (
        //     <div className='App'>
        //         <Routes>
        //             <Route path="admin" element={<Admin />} >
        //                 {/* <Route path="dashboard" element={<Dashboard />} /> */}
        //                 {/* <Route path="user" element={<UserProfile />} /> */}
        //                 <Route path="banner" element={<BannerManager />} />
        //                 <Route path="tag" element={<TagList />} />
        //                 <Route path="editorClassList" element={<EditorClassList />} />


        //                 <Route path="editorList" >
        //                     <Route index element={<EditorList />} />
        //                     <Route path="new" element={<NewIEditor />} />
        //                     <Route path=":id" element={<IEditor />} loader={async ({ params, request: { signal } }) => {
        //                         const res = await fetch(`http://10.88.0.106:3000/editor/${params.id}`, { signal })

        //                         return res.data.json()
        //                     }} />
        //                 </Route>
        //                 {/* <Route path="editorManager" element={<EditorManager />} >
        //                         <Route path="news" element={<EditorManagerNews />} />
        //                         <Route path="hot" element={<EditorManagerHot />} />
        //                         <Route path="recommend" element={<EditorManagerRecommend />} />
        //                     </Route> */}
        //             </Route>
        //             <Route path="auth" element={<Auth />}>
        //                 <Route path="login-page" element={<LoginPage />} />
        //                 <Route path="register-page" element={<RegisterPage />} />
        //             </Route>
        //             {/* <Route path="/" render={(props) => <Dashboard {...props} />} /> */}
        //         </Routes>
        //     </div>

    )
}



export default App;