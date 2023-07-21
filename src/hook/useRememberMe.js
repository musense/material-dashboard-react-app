import { useState, useEffect } from "react";

export default function useRememberMe(loginFormRef) {

    const [rememberMeChecked, setRememberMeChecked] = useState(false);
    useEffect(() => {
        if (loginFormRef.current === null) {
            return

        } else {
            const loginForm = loginFormRef.current;
            if (localStorage.getItem('username')) {
                loginForm.username.focus()
                loginForm.username.value = localStorage.getItem('username') || '';
                setRememberMeChecked(true);
            }
        }

        return () => {
            setRememberMeChecked(false)
        }
    }, [loginFormRef]);

    return { rememberMeChecked }
}
