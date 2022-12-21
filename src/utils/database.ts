import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

// const url = 'mongodb://root:rootpassword@localhost:27017/';
const url = process.env.DATABASE_URL!;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;

export async function connectDB() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('users');

    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);
  
    // the following code examples can be pasted here...

    // console.log(collection);

    // client.close();
  
    return client;
}

export async function closeDB(client: MongoClient){
    client.close();
}
    