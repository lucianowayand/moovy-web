import DashboardLayout from "../../components/dashboard-layout";
import { EmptyQuery } from "../../components/empty-query";


export default function MyLibrary() {
    return <DashboardLayout>
        <EmptyQuery text="It looks like there are no movies in your library!
            Search for a movie you have watched and add it here!" />
    </DashboardLayout>
}