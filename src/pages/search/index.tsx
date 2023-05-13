import { Box } from "@mui/material";
import DashboardLayout from "../../components/dashboard-layout";
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { useEffect, useState } from "react";
import { EmptyQuery } from "../../components/empty-query";

export default function Search() {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.length > 0) {
            console.log(query)
        }
    }, [query]);

    return <DashboardLayout>
        <Box display="flex" alignItems="center">
            <input value={query} onChange={(event) => setQuery(event.target.value)} style={{paddingLeft:"1em"}} />
            <SearchIcon sx={{ marginLeft: "-1.5em" }} />
        </Box>
        <Box mt={18}>
            <EmptyQuery text="We couldn't find the movies you were looking for :( "/>
        </Box>
    </DashboardLayout>
}