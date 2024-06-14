import { MongoClient } from "mongodb";

const dbUrl = process.env.MONGO_URI;
let client = new MongoClient(dbUrl);
let clientPromise = client.connect();
export default clientPromise;
