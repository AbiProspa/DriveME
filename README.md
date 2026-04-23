# DriveMe Website

DriveMe is a Next.js website for booking interstate driver services.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking email setup (SMTP)

1. Copy `.env.example` to `.env.local`.
2. Fill in your SMTP credentials and recipient email.
3. Restart the dev server.

Environment variables:

- `SMTP_HOST`: SMTP server hostname.
- `SMTP_PORT`: SMTP port (`587` for TLS or `465` for SSL).
- `SMTP_SECURE`: `true` for SSL (usually with 465), otherwise `false`.
- `SMTP_USER`: SMTP username (optional for local no-auth SMTP servers).
- `SMTP_PASS`: SMTP password or app password (optional for local no-auth SMTP servers).
- `BOOKING_FROM_EMAIL`: Sender email for outbound booking notifications.
- `BOOKING_TO_EMAIL`: Destination inbox for booking requests.

When users submit the form, a server route (`POST /api/bookings`) validates the payload and sends the booking details by email.

## Useful scripts

```bash
npm run dev
npm run build
npm run lint
```
