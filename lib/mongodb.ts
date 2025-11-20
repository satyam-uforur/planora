import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable")
}

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db("planora")

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}
