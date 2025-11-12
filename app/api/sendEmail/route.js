import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, date, time, service, phone, price, slug} = body
    console.log(slug)

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail
        pass: process.env.GMAIL_PASS, // your App Password
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Appointo" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Booking Confirmation",
      html: `
        <h2>Booking Confirmed ✅</h2>
        <p>Hi <b>${name}</b>,</p>
        <p>Your booking for <b>${service}</b> has been confirmed!</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <br/>
        <p>Thank you for using <b>Appointo</b>. See you soon!</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    const client = (await connection).db('Appointo').collection('GetUserInfo')
        const getSlug = await client.insertOne({name: name, email: email, date: date, time: time, service: service, phone: phone,
            price : price, slug : slug
        } )

    return Response.json({ success: true, message: "Email sent successfully!", getSlug });

    





  } catch (error) {
    console.error("Email Error:", error);
    return Response.json({ success: false, message: "Failed to send email." });
  }


}
