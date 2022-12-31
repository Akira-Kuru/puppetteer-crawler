import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

// const url = 'mongodb://root:rootpassword@localhost:27017/';
const url = process.env.DATABASE_URL!;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;
const db = client.db(dbName);

export async function connectDB() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to the MongoDB Server');
    // const collection = db.collection('users');

    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);
  
    // the following code examples can be pasted here...

    // console.log(collection);

    // client.close();
  
    return client;
}

export async function findEntry(collection: string, id: number){
    const result = await db.collection(collection).find({id: id}).toArray();
    console.log('Found document =>', result);
    return result;
}
export async function findAllEntries(collection: string){
    const result = await db.collection(collection).find({}).toArray();
    console.log('Found documents =>', result);
    return result;
}
export async function insertEntry(collection: string, array){
    const insertResult = await db.collection(collection).insertMany([array]);
    console.log('Inserted documents =>', insertResult);
}
export async function updateEntry(collection: string, query, array){
    const updateResult = await db.collection(collection).updateOne({ a: 3 }, { $set: { b: 1 } });
    console.log('Updated documents =>', updateResult);
}
export async function deleteEntry(collection: string, query){
    const deleteResult = await db.collection(collection).deleteMany({ id: 3 });
    console.log('Deleted documents =>', deleteResult);
}
export async function closeDB(){
    await client.close();
    console.log('Connection closed to the MongoDB Server');
}
    