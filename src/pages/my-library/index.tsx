import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard-layout";
import { EmptyQuery } from "../../components/empty-query";
import { useAuth } from "../../context/AuthContext";
import { Movie } from "../../utils/types";
import { api } from "../../services/api";
import { Box, CircularProgress, Grid } from "@mui/material";
import MovieCard from "../../components/movie-card";


export default function MyLibrary() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (user?.id) {
            getMovies();
        }
    }, [user]);

    async function getMovies() {
        setLoading(true);
        try {
            const res = await api.get(`/library/user/${user?.id}`);
            console.log(res.data);
            const moviesArray = res.data.map((elements: any) => {
                return {
                    Title: elements.movie.title,
                    Year: elements.movie.year,
                    imdbID: elements.movie.imdbID,
                    Poster: elements.movie.poster,
                    imdbRating: elements.movie.imdbRating,
                    Review: elements.review,
                    inLibrary: true,
                }
            }
            );
            setMovies(moviesArray);
        } catch (error) {
            setMovies([]);
            console.log(error);
        }
        setLoading(false);
    }

    return <DashboardLayout>
        {!loading ? <Box mt={3}>
            {movies.length > 0 ? <Grid container>
                {movies.map((movie, index) => {
                    return <Grid key={movie.imdbID} item xs={4}>
                        <MovieCard movie={movie} moviesArray={movies} index={index} setterFunction={setMovies} />
                    </Grid>
                })}
            </Grid> : <Box mt={15}>
                <EmptyQuery text="It looks like there are no movies in your library!
            Search for a movie you have watched and add it here! " />
            </Box>}
        </Box> : <Box mt={15} width="100%" display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "black" }} size="50px" />
        </Box>}
    </DashboardLayout>
}