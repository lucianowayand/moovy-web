import { useEffect, useState } from "react";
import { EmptyQuery } from "../../components/empty-query";
import { Movie } from "../../utils/types";
import { Box, Grid } from "@mui/material";
import { api } from "../../services/api";
import DashboardLayout from "../../components/dashboard-layout";
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

export default function Search() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (query.length >= 3) {
            getMovies();
        }
    }, [query]);

    async function getMovies() {
        try {
            const res = await api.get(`movies?search=${query}`);
            console.log(res.data)
            if (res.data.length > 0) {
                setMovies(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <DashboardLayout>
        <Box display="flex" alignItems="center">
            <input value={query} onChange={(event) => setQuery(event.target.value)} style={{ paddingLeft: "1em" }} />
            <SearchIcon sx={{ marginLeft: "-1.5em" }} />
        </Box>
        <Box mt={3}>
            {movies.length > 0 ? <Grid container>
                {movies.map((movie) => {
                    return <Grid xs={4}>
                        <MovieCard movie={movie} />
                    </Grid>
                })}
            </Grid> : <Box mt={15}>
                <EmptyQuery text="We couldn't find the movies you were looking for :( " />
            </Box>}
        </Box>
    </DashboardLayout>
}

function MovieCard({ movie }: { movie: Movie }) {
    return <Box m={3}>
        <img src={movie.Poster} alt={movie.Title} />
    </Box>
}