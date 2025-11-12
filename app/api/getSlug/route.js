
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    try {
       
        const body = await request.json()
        const {email} = body
        console.log(email)
        const client1 = (await connection).db('Appointo').collection('LoggedUser')
        const getSlug = await client1.find({email : email}).toArray()
        console.log(getSlug)
        
        return NextResponse.json({ message: 'Slug found successfully.', status: 200, getSlug })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Error', status: 500 })
    }

}