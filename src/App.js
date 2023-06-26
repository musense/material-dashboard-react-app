import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import Dashboard from 'views/Dashboard/Dashboard.jsx';
import EditorList from 'views/EditorList'
import IEditor from 'views/IEditor/[id]'
import NewIEditor from 'views/IEditor'
import LoginPage from 'views/Pages/LoginPage';
import RegisterPage from 'views/Pages/RegisterPage';
import TagList from './views/TagList';
import EditorClassList from './views/EditorClassList';
import './app.css'

function App() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log("🚀 ~ file: App.js:24 ~ App ~ location:", location)

    useEffect(() => {
        window.sessionStorage.setItem('pathname', location.pathname)
    }, [location.pathname]);

    useEffect(() => {
        const lastLocation = window.sessionStorage.getItem('pathname')
        if (!lastLocation || lastLocation === '/') {
            navigate('/auth/login-page')
        } else if (lastLocation) {
            // navigate('/auth/login-page')
            // navigate('/admin/editorList')
            // navigate('/admin/editorList/new')
            navigate(lastLocation)
        }

        // dispatch({ type: GetClassAction.REQUEST_CLASS_LIST })
        // navigate('/admin/editorList/new')

        // navigate('/auth/register-page')
        // navigate('/admin/tag')

        // navigate('/admin/editorClassList')
        // navigate('/admin/table')
        // navigate('/admin/editorList/new')

        // navigate('/admin/editorManager')

    }, []);

    return (
        <>
            <div className='App'>
                <Routes>
                    <Route path="admin" element={<Admin />} >
                        {/* <Route path="dashboard" element={<Dashboard />} /> */}
                        {/* <Route path="user" element={<UserProfile />} /> */}
                        <Route path="tag" element={<TagList />} />
                        <Route path="editorClassList" element={<EditorClassList />} />

                        <Route path="editorList" >
                            <Route index element={<EditorList />} />
                            <Route path="new" element={<NewIEditor />} />
                            <Route path=":id" element={<IEditor />} />
                        </Route>
                        {/* <Route path="editorManager" element={<EditorManager />} >
                            <Route path="news" element={<EditorManagerNews />} />
                            <Route path="hot" element={<EditorManagerHot />} />
                            <Route path="recommend" element={<EditorManagerRecommend />} />
                        </Route> */}
                    </Route>
                    <Route path="auth" element={<Auth />}>
                        <Route path="login-page" element={<LoginPage />} />
                        <Route path="register-page" element={<RegisterPage />} />
                    </Route>
                    {/* <Route path="/" render={(props) => <Dashboard {...props} />} /> */}
                </Routes>
            </div>
        </>
    )
}


export default App;