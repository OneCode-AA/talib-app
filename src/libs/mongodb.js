import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
const options = {};

let client;
let clientPromise;

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your DATABASE_URL to .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
