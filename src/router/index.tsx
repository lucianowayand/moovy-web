import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/home";

export default function Router(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
}