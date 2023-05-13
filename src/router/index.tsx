import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import NotFound from "../pages/404";
import Search from "../pages/search";
import MyLibrary from "../pages/my-library";

export default function Router() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Search />} />
            <Route path="/dashboard/my-library" element={<MyLibrary />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
}