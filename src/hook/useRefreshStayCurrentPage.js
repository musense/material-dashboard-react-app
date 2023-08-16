import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

export default function useRefreshStayCurrentPage() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        window.sessionStorage.setItem('pathname', location.pathname)
    }, [location.pathname]);

    useEffect(() => {
        const lastLocation = window.sessionStorage.getItem('pathname')
        if (!lastLocation || lastLocation === '/') {
            navigate('/login')
        } else if (lastLocation) {
            navigate(lastLocation)
        }
    }, []);
}
