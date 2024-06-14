import { ObjectId } from "mongodb";
import clientPromise from "./db";

const dbName = "admin";
const collectionName = "system.users";

export const fetchUsers = async () => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const users = await collection.find({}).toArray();
  return users;
};

export const fetchUser = async (id) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const queryId = { _id: new ObjectId(id) };
  const user = await collection.findOne(queryId);
  return user;
};

export const createUser = async (user) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const newUser = await collection.insertOne(user);
  return newUser.insertedId;
};

export const deleteUser = async (id) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const queryId = { _id: new ObjectId(id) };
  const result = await collection.deleteOne(queryId);
  return result.deletedCount;
};

export const updateUser = async (id, updateData) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const queryId = { _id: new ObjectId(id) };
  const result = await collection.updateOne(queryId, { $set: updateData });
  return result.modifiedCount;
};
