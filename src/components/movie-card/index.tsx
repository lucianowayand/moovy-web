import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Movie } from "../../utils/types";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { useState } from "react";

export default function MovieCard({ movie, moviesArray, index, setterFunction }: { movie: Movie, moviesArray: Movie[], index: number, setterFunction: any }) {
    const { user } = useAuth();
    const [toast, setToast] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

    async function assertDeleteReview() {
        if (movie.Review) {
            setDialog(true);
        } else {
            removeFromLibrary();
        }
    }

    async function removeFromLibrary() {
        try {
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

            setDialog(false);
        } catch (err) {
            console.log(err);
            alert("Something went wrong, please try again later");
        }
    }

    async function addToLibrary() {
        try {
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
        } catch (err) {
            console.log(err);
            alert("Something went wrong, please try again later");
        }
    }

    return <Box margin={3}>
        <Dialog
            open={dialog}
            onClose={() => setDialog(false)}
        >
            <DialogTitle style={{ fontFamily: "Inter" }}>Remove from your library</DialogTitle>
            <DialogContent><DialogContentText style={{ fontFamily: "Inter" }}>
                Are you sure you want to remove "{movie.Title}" from your library? This action cannot be undone.
                It contains a written review, so it will be deleted as well.
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={() => setDialog(false)} style={{ fontFamily: "Inter" }}> Cancel</Button>
                <Button onClick={removeFromLibrary} autoFocus style={{ fontFamily: "Inter" }}>Remove</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={toast} autoHideDuration={2000} onClose={() => setToast(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
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
                    <button className={movie.inLibrary ? "in-library" : undefined} onClick={() => movie.inLibrary ? assertDeleteReview() : addToLibrary()}>{movie.inLibrary ? "Remove from My Library" : "Add to My Library"}</button>
                </Box>
            </Box>
        </Card>
    </Box >
}