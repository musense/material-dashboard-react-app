import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from 'views/Dashboard/Dashboard.jsx';
import TableList from 'views/TableList/TableList.jsx'
import EditorList from 'views/EditorList/EditorList.jsx'
import IEditor from 'views/IEditor/IEditor.jsx'
import UserProfile from 'views/UserProfile/UserProfile';
import LoginPage from 'views/Pages/LoginPage';
import RegisterPage from 'views/Pages/RegisterPage';


function App() {
    const navigate = useNavigate()

    useEffect(() => {
        // navigate('/auth/register-page')
        // navigate('/auth/login-page')
        navigate('/admin/dashboard')
    }, []);

    return (
        <>
            <div className='App'>
                <Routes>
                    <Route path="admin" element={<Admin />} >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="user" element={<UserProfile />} />
                        <Route path="table" element={<TableList />} />
                        <Route path="editorList" >
                            <Route index element={<EditorList />} />
                            <Route path=":id" element={<IEditor />} />
                        </Route>
                    </Route>
                    <Route path="auth" element={<Auth />}>
                        <Route path="login-page" element={<LoginPage />} />
                        <Route path="register-page" element={<RegisterPage />} />
                    </Route>
                    <Route path="rtl" render={(props) => <RTL {...props} />} />
                    {/* w/ useEffect navigate, in order to redirect */}
                    <Route path="/" render={(props) => <Dashboard {...props} />} />
                </Routes>
            </div>
        </>
    )
}

export default App;