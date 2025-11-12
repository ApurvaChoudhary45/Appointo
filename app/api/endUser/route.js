import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function GET(request, {params}) {
    try {
        const {slug} = await params
        console.log(slug)
        const currService = (await connection).db('Appointo').collection('Services')
        const getService = await currService.find({Slug : slug }).toArray()
        return NextResponse.json({message : 'Details Found', getService, status: '200'})
    } catch (error) {
        return NextResponse.json({message : 'Unable to load services', getService, status: '401'})
    }
}