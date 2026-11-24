import {MongoClient,Db,Collection} from 'mongodb';
import {MatchProps} from "@/types";
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error('MongoDB URI missing');
}

const DB_NAME = "cs303-final-project";
let client:MongoClient | null = null;

let db: Db | null = null;

async function connect(): Promise<Db>{
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(
    collectionName: string,
) : Promise<Collection>{
    if (!db){
        db = await connect();
    }
    return db.collection(collectionName);
}


export async function listMatches () {
    const URLCollection = await getCollection("match-collection");
    return await URLCollection.find().toArray();

}


export async function goToMatch(match:string){
    const URLCollection = await getCollection("match-collection");
    const data = await URLCollection.find().toArray();

    const matches: MatchProps[] = data.map ((p) => ({
        matchID:p.matchID,
        host:p.host,
        player2:p.player2,

    }))
    console.log(match.toLowerCase());
    let i = 0;
    for (i = 0; i < matches.length; i++) {
        if (matches[i].host === (match)) {
            //Return actual match component
        }
    }

    throw new Error ("match Not Found");
}