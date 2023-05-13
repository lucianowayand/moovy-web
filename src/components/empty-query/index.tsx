import { Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function EmptyQuery({ text }: { text?: string }) {
    return <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="100%">
        <SearchIcon sx={{ fontSize: "5em", padding: "0.5em" }} />
        <Box width="50%">
            <Typography sx={{ color: "a1a1a1", textAlign:"justify" }} fontFamily="Arial" fontWeight={400} fontSize={24}>
                {text}
            </Typography>
        </Box>
    </Box>
}