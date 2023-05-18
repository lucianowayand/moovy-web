import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { EmptyQuery } from "../../components/empty-query";
import { Movie } from "../../utils/types";
import { api } from "../../services/api";

import DashboardLayout from "../../components/dashboard-layout";
import MovieCard from "../../components/movie-card";
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { useAuth } from "../../context/AuthContext";

export default function Search() {
    const { user } = useAuth();

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
                    const movieRes = await api.get(`library/user/${user?.id}/movie/${movie.imdbID}`);
                    return {
                        ...movie,
                        imdbRating: movieRes.data.movie.imdbRating,
                        inLibrary: movieRes.data.inLibrary,
                        Review: movieRes.data.review,
                    };
                });

                const updatedMovies = await Promise.all(moviePromises);
                setMovies(updatedMovies);
            }
        } catch (error) {
            setMovies([]);
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
                {movies.map((movie, index) => {
                    return <Grid item xs={4}>
                        <MovieCard movie={movie} moviesArray={movies} index={index} setterFunction={setMovies} />
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

