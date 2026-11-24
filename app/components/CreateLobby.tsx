"use server"
import {MatchProps} from "@/types";
import getCollection from "@/db";
import WaitForPlayerTwoJoin from "./WaitForPlayerTwoJoin";


export default async function createMatch(host:string){
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
            return ("Match Created by Host " + host + " Already Exists");
        }
    }



    host = host.toLowerCase();
    const player2 = "Empty";
    const res = await postsCollection.insertOne({host,player2});
    if (!res.acknowledged) {
        return("DB insert failed");
    }

    return MatchLogic(host, host); //Redirect to [match] with host replacing [match], and wait for another to join
}