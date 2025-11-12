
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    try {
        const body = await request.json()

        const client = (await connection).db('Appointo').collection('LoggedUser')
        await client.insertOne(body)
        return NextResponse.json({ message: 'Link generated successfully', status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Error', status: 500 })
    }

}