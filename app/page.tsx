import {listMatches} from "@/db";
import {MatchProps} from "@/types";
import styled from "styled-components";


const MatchCard = styled.main`
    width: 80vw;
    margin: auto;
    background-color: aquamarine;
`;


export default function Home() {
    const matches = listMatches();


    // Handle error and loading
    if (!matches) return <div>Loading...</div>;

    return (
        <div>
            <h3>
                Create a new match or whatever here HTML PART
            </h3>
            <h3> Current Matches:</h3>
            <div id={"match container"}>
                List all the Matches here, and press a join button on them to trigger Join component
            </div>
        </div>
    );
}
