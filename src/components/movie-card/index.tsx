import { Box, Card, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Movie } from "../../utils/types";

export default function MovieCard({ movie, children }: { movie: Movie, children: any }) {
    return <Box margin={3}>
        <Card>
            <Box padding={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <img src={movie.Poster} alt={movie.Title} width="300px" height="400px" />
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Typography sx={{ fontWeight: 600 }} variant="h6">{movie.Title.trim().length > 20 ? movie.Title.slice(0, 16).trim() + "..." : movie.Title}</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarBorderIcon sx={{ paddingRight: '5px' }} />
                        <Typography sx={{ color: "a1a1a1" }} variant="body1">{movie.imdbRating}</Typography>
                    </Box>
                </Box>
                <Box mt={1}>
                    {children}
                </Box>
            </Box>
        </Card>
    </Box>
}