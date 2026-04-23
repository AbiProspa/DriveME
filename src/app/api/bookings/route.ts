import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/lib/config";
import { normalizeBookingInput, validateBookingInput } from "@/lib/booking";

function getSmtpConfig() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) return null;

    return {
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    };
}

export async function POST(request: Request) {
    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }

    const booking = normalizeBookingInput(payload);
    const validation = validateBookingInput(booking);

    if (!validation.isValid) {
        return NextResponse.json(
            {
                message: "Please correct the highlighted fields.",
                errors: validation.errors,
            },
            { status: 400 }
        );
    }

    const smtpConfig = getSmtpConfig();

    if (!smtpConfig) {
        console.error("Booking email failed: missing SMTP configuration.");
        return NextResponse.json(
            {
                message: "Booking service is temporarily unavailable. Please try again shortly.",
            },
            { status: 500 }
        );
    }

    const toEmail = process.env.BOOKING_TO_EMAIL ?? SITE_CONFIG.email;
    const fromEmail = process.env.BOOKING_FROM_EMAIL ?? "no-reply@driveme.local";
    const submittedAt = new Date().toLocaleString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const transporter = nodemailer.createTransport(smtpConfig);

    console.log(`Attempting to send booking emails. Admin: ${toEmail}, User: ${booking.email}`);

    try {
        // 1. Send Admin Notification
        await transporter.sendMail({
            from: `"Max-DriveMe Bookings" <${fromEmail}>`,
            to: toEmail,
            replyTo: booking.email,
            subject: `New Max-DriveMe booking request: ${booking.fullName}`,
            text: [
                "New Max-DriveMe booking request",
                `Submitted: ${submittedAt}`,
                `Full Name: ${booking.fullName}`,
                `Email: ${booking.email}`,
                `Phone: ${booking.phone}`,
                `Pickup: ${booking.pickup}`,
                `Destination: ${booking.destination}`,
                `Travel Date: ${booking.date}`,
                `Additional Notes: ${booking.notes || "None"}`,
            ].join("\n"),
            html: `
                <h2>New Max-DriveMe booking request</h2>
                <p><strong>Submitted:</strong> ${submittedAt}</p>
                <p><strong>Full Name:</strong> ${booking.fullName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Pickup:</strong> ${booking.pickup}</p>
                <p><strong>Destination:</strong> ${booking.destination}</p>
                <p><strong>Travel Date:</strong> ${booking.date}</p>
                <p><strong>Additional Notes:</strong> ${booking.notes || "None"}</p>
            `,
        });

        // Add a small delay to avoid Gmail SMTP rate-limiting/spam-detection issues
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 2. Send User Confirmation
        await transporter.sendMail({
            from: `"Max-DriveMe" <${fromEmail}>`,
            to: booking.email,
            subject: `Booking Request Received - Max-DriveMe`,
            text: [
                `Hi ${booking.fullName},`,
                "",
                `Thank you for choosing Max-DriveMe! We have received your booking request for a trip from ${booking.pickup} to ${booking.destination} on ${booking.date}.`,
                "",
                `Our team will review your request and contact you shortly at ${booking.phone} to confirm the details and finalize your booking.`,
                "",
                "Safe travels,",
                "The Max-DriveMe Team",
            ].join("\n"),
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                    <h2 style="color: #0f172a;">Booking Request Received!</h2>
                    <p>Hi <strong>${booking.fullName}</strong>,</p>
                    <p>Thank you for choosing <strong>Max-DriveMe</strong>! We have received your booking request and our team is already reviewing it.</p>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="margin-top: 0; font-size: 16px;">Trip Summary:</h3>
                        <p style="margin: 5px 0;"><strong>From:</strong> ${booking.pickup}</p>
                        <p style="margin: 5px 0;"><strong>To:</strong> ${booking.destination}</p>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${booking.date}</p>
                    </div>

                    <p>We will contact you shortly at <strong>${booking.phone}</strong> to confirm the details and finalize your booking.</p>
                    
                    <p style="margin-top: 30px;">Safe travels,<br><strong>The Max-DriveMe Team</strong></p>
                </div>
            `,
        });

        return NextResponse.json({
            message: "Booking request sent successfully. We will contact you shortly.",
        });
    } catch (error) {
        console.error("Booking email failed to send:", error);

        return NextResponse.json(
            {
                message: "Unable to send your booking request right now. Please try again shortly.",
            },
            { status: 500 }
        );
    }
}
