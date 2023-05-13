import { Box } from "@mui/material";
import Navbar from "../navbar";
import './style.css'
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }: any) {
    return <Box>
        <Navbar />
        <Box display="flex" justifyContent="center">
            <Box width="60%">
                <Box display="flex">
                    <Box mr={8}>
                        <Link to="/dashboard" className={`menu-link ${window.location.pathname === "/dashboard/my-library" ? "inactive" : undefined}`}>Search</Link>
                    </Box>
                    <Box>
                        <Link to="/dashboard/my-library" className={`menu-link ${window.location.pathname === "/dashboard" ? "inactive" : undefined}`}>My List</Link>
                    </Box>
                </Box>
                <Box mt="3em">
                    {children}
                </Box>
            </Box>
        </Box>
    </Box>
}