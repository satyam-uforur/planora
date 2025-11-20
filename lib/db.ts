import { MongoClient } from "mongodb"

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set")
}

let cachedClient: any = null

export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGO_URI)
  await client.connect()
  cachedClient = client
  return client
}

export async function getDatabase() {
  const client = await getMongoClient()
  return client.db("planora")
}

export async function getUsersCollection() {
  const db = await getDatabase()
  return db.collection("users")
}

export async function getBookingsCollection() {
  const db = await getDatabase()
  return db.collection("bookings")
}

export async function getMessagesCollection() {
  const db = await getDatabase()
  return db.collection("messages")
}
