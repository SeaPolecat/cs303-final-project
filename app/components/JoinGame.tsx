"use server"
import {MatchProps} from "@/types";
import getCollection from "@/db";


export default async function JoinGame(host:string, player2:string) {
    const postsCollection = await getCollection("match-collection");


    const data = await postsCollection.find().toArray();

    const matches: MatchProps[] = data.map ((p) => ({
        host:p.host,
        player2:p.player2,
        hostPieces:p.hostPieces,
        player2Pieces:p.player2Pieces,
    }))

    let i = 0;
    for (i = 0; i < matches.length; i++) {
        if (matches[i].host == host) {
            if (matches[i].player2 != "Empty"){
                throw new Error ("Game is Already Full");
            }
            if (host == player2) {
                return MatchLogic(host, host);
                // Don't add a new player, just send directly to MatchLogic
            }
            const res = await postsCollection.updateOne({host:host},{host,player2});
            // Change the game so that player2 is set as the person who just joined the Game
            // UNLESS Player2 = host OR player2 already exists

            return MatchLogic(host, player2);

            //Join the Game, actual correct path
        }
    }

    //If joining fails, throw error
    throw new Error ("No Match By Host " + host);



}