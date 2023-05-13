import { useEffect, useState } from "react";
import { EmptyQuery } from "../../components/empty-query";
import { Movie } from "../../utils/types";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { api } from "../../services/api";
import DashboardLayout from "../../components/dashboard-layout";
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

export default function Search() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length >= 3) {
            getMovies();
        }
    }, [query]);

    async function getMovies() {
        setLoading(true);
        try {
            const res = await api.get(`movies?search=${query}`);
            if (res.data.length > 0) {
                const moviePromises = res.data.map(async (movie: Movie) => {
                    const movieRes = await api.get(`movies/detail?id=${movie.imdbID}`);
                    return {
                        ...movie,
                        imdbRating: movieRes.data.imdbRating
                    };
                });

                const updatedMovies = await Promise.all(moviePromises);
                setMovies(updatedMovies);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }


    return <DashboardLayout>
        <Box display="flex" alignItems="center">
            <input value={query} onChange={(event) => setQuery(event.target.value)} style={{ paddingLeft: "1em" }} />
            <SearchIcon sx={{ marginLeft: "-1.5em" }} />
        </Box>
        {!loading ? <Box mt={3}>
            {movies.length > 0 ? <Grid container>
                {movies.map((movie) => {
                    return <Grid xs={4}>
                        <MovieCard movie={movie} />
                    </Grid>
                })}
            </Grid> : <Box mt={15}>
                <EmptyQuery text="We couldn't find the movies you were looking for :( " />
            </Box>}
        </Box> : <Box mt={15} width="100%" display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "black" }} size="50px" />
        </Box>}
    </DashboardLayout>
}

function MovieCard({ movie }: { movie: Movie }) {
    return <Box margin={3}>
        <Card>
            <Box padding={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <img src={movie.Poster} alt={movie.Title} width="300px" height="400px" />
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Typography sx={{ fontWeight: 600 }} variant="h6">{movie.Title}</Typography>
                    <Typography sx={{ color: "a1a1a1" }} variant="body1">{movie.imdbRating}</Typography>
                </Box>
                <Box mt={1}>
                    <button>Add to My Library</button>
                </Box>
            </Box>
        </Card>
    </Box>
}