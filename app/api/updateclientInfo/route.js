import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

let URI=  process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()

export async function PUT(request) {
    try {
        const body = await request.json()
    const {name, phone, businessname, address, description, _id, image} = body
    const clientInfo = (await connection).db('Appointo').collection('LoggedUser')
    await clientInfo.updateOne({_id : new ObjectId(_id)}, {$set : {name : name, phone : phone, businessname : businessname, address : address, description : description, image : image}})
    return NextResponse.json({success : 'Updated Sucessfully'}, {status : 200})
    } catch (error) {
          return NextResponse.json({success : 'Unable to update'}, {status : 500})
    }



}