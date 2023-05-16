import { Alert, Box, Card, Snackbar, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Movie } from "../../utils/types";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { useState } from "react";

export default function MovieCard({ movie, moviesArray, index, setterFunction }: { movie: Movie, moviesArray: Movie[], index: number, setterFunction: any }) {
    const { user } = useAuth();
    const [toast, setToast] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

    async function buttonInteraction(movie: Movie) {
        if (movie.inLibrary) {
            const res = await api.delete(`library/user/${user?.id}/movie/${movie.imdbID}`);
            if (res.status === 200) {
                const newMovies = [...moviesArray];
                newMovies[index].inLibrary = false;
                setterFunction(newMovies);
                setSnackbarSuccess(false);
                setToast(true);
            } else {
                alert("Something went wrong, please try again later");
            }

        } else {
            const res = await api.post(`library/user/${user?.id}/movie/${movie.imdbID}`);
            if (res.status === 201) {
                const newMovies = [...moviesArray];
                newMovies[index].inLibrary = true;
                setterFunction(newMovies);
                setSnackbarSuccess(true);
                setToast(true);
            } else {
                alert("Something went wrong, please try again later");
            }
        }
    }

    return <Box margin={3}>
        <Snackbar open={toast} autoHideDuration={2000} onClose={() => setToast(false)} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
        <Alert onClose={() => setToast(false)} severity={snackbarSuccess ? "success" : "error"} sx={{ width: '100%' }}>
          {`Movie ${snackbarSuccess ? "added to" : "removed from"} My Library!`}
        </Alert>
      </Snackbar>
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
                    <button className={movie.inLibrary ? "in-library" : undefined} onClick={() => buttonInteraction(movie)}>{movie.inLibrary ? "Remove from My Library" : "Add to My Library"}</button>
                </Box>
            </Box>
        </Card>
    </Box >
}