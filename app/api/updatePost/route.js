import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    try {
        const body = await request.json()
        const currService = (await connection).db('Appointo').collection('GetInfo')
        await currService.insertOne(body)
        return NextResponse.json({message : 'Details Found'}, { status: '200'})
    } catch (error) {
        return NextResponse.json({message : 'Unable to load services'}, {status: '401'})
    }
}