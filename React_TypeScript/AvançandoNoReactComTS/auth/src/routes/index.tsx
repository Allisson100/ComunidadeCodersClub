import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes () {
    return (
        <Routes>
            <Route path='/login' Component={SignIn} />
            <Route path='/dashboard' Component={Dashboard} />

            {/* <Route path='*' Component={SignIn}/> */}
        </Routes>
    )
}