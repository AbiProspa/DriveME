import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/config";
import { normalizeBookingInput, validateBookingInput } from "@/lib/booking";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (!process.env.RESEND_API_KEY) {
        console.error("Booking email failed: missing RESEND_API_KEY.");
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

    try {
        const { error } = await resend.emails.send({
            from: `Max-DriveMe Bookings <${fromEmail}>`,
            to: toEmail,
            subject: `New Max-DriveMe booking request: ${booking.fullName}`,
            text: [
                "New Max-DriveMe booking request",
                `Submitted: ${submittedAt}`,
                `Full Name: ${booking.fullName}`,
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
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Pickup:</strong> ${booking.pickup}</p>
                <p><strong>Destination:</strong> ${booking.destination}</p>
                <p><strong>Travel Date:</strong> ${booking.date}</p>
                <p><strong>Additional Notes:</strong> ${booking.notes || "None"}</p>
            `,
        });

        if (error) {
            throw error;
        }

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
