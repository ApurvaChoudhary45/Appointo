import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    try {
        const body = await request.json()
        const {slug} = body
        console.log(slug)
        const currService = (await connection).db('Appointo').collection('GetUserInfo')
        const getService = await currService.find({slug : slug }).toArray()
        return NextResponse.json({message : 'Details Found', getService, status: '200'})
    } catch (error) {
        return NextResponse.json({message : 'Unable to load services', getService, status: '401'})
    }
}