import { Box, Typography } from "@mui/material"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function NotFound() {
    return <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography fontSize={24} fontWeight={700} fontFamily="Inter">Page not found</Typography>
        <WarningAmberIcon sx={{ fontSize: "5em", padding: "0.5em" }} />
        <Typography fontSize={20} fontWeight={700} fontFamily="Inter">ERROR 404</Typography>
    </Box>
}