import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI

const client = new MongoClient(URI)


export async function PUT(request) {
    const body = await request.json()
    const { slug, newslug } = body
    console.log(slug, newslug)
    const connection = await client.connect()
    const db = connection.db('Appointo')
   

   try {
     await Promise.all([
        db.collection('Services').updateMany({ Slug: slug }, { $set: { Slug: newslug } }),
        db.collection('SalonSpa').updateMany({ slug: slug }, { $set: { slug: newslug } }),
        db.collection('LoggedUser').updateMany({ slug: slug }, { $set: { slug: newslug } }),
        db.collection('GetUserInfo').updateMany({ slug: slug }, { $set: { slug: newslug } }),
        db.collection('GetInfo').updateMany({ slug: slug }, { $set: { slug: newslug } }),

    ])
    return NextResponse.json({success : true}, {status: 200})
   } catch (error) {
     return NextResponse.json({success : false}, {status: 500})
   }

}