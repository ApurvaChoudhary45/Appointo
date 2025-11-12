import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { name, email, service, _id } = body
        console.log(_id)

        // Configure the email transport
        const transportation = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        const cancelEmail = {
            from: `${process.env.GMAIL_USER}`,
            to: email,
            subject: ` Service Cancellation Notice – ${service}`,
            html: `
        <h3>Dear ${name},</h3>
        <p>We regret to inform you that your scheduled service, ${service}, has been cancelled due to unavoidable circumstances.</p>
        <p>We sincerely apologize for the inconvenience this may cause and appreciate your understanding. Our team is working diligently to ensure such disruptions are minimized in the future.</p>
        <p>If you have any questions or would like to reschedule, please don’t hesitate to reach out. We’re here to assist you.
        Thank you for your continued trust.</p>
        <p>Warm regards,</p>
        <p>The Appointo Team</p>`
        }

        await transportation.sendMail(cancelEmail)

        const deleteBooking = (await connection).db('Appointo').collection('GetUserInfo')

        await deleteBooking.deleteOne({_id : new ObjectId(_id)})
        
        return Response.json({ success: true, message: "Email send successfully." });

    } catch (error) {
        console.error("Email Error:", error);
        return Response.json({ success: false, message: "Failed to send email." });
    }


}
