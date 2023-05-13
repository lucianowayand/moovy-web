import { Box, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    const { logOut } = useAuth()

    return <Box display="flex" justifyContent="space-between" py="1.5em" px="2em">
        <Typography fontSize={24} fontWeight={700} color="#F2911B" fontFamily="Inter">Moovy</Typography>
        <IconButton onClick={logOut}>
            <LogoutIcon />
        </IconButton>
    </Box>
}