"use client";

import { useForm } from "react-hook-form";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

type BookingFormData = {
    fullName: string;
    phone: string;
    pickup: string;
    destination: string;
    date: string; // Optional
    notes: string; // Optional
};

export default function BookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>();

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);

        try {
            // 1. Send Email via EmailJS
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (serviceId && templateId && publicKey) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const emailjs = await import("@emailjs/browser");

                await emailjs.default.send(
                    serviceId,
                    templateId,
                    {
                        to_email: SITE_CONFIG.email,
                        from_name: data.fullName,
                        from_phone: data.phone,
                        pickup: data.pickup,
                        destination: data.destination,
                        travel_date: data.date || "Not specified",
                        message: data.notes || "None",
                    },
                    publicKey
                );
            } else {
                console.warn("EmailJS credentials not found. Skipping email send.");
            }

            // 2. Open WhatsApp (Redundancy)
            const message = `*New Booking Request*%0A%0A*Name:* ${data.fullName}%0A*Phone:* ${data.phone}%0A*From:* ${data.pickup}%0A*To:* ${data.destination}%0A*Date:* ${data.date || "Not specified"}%0A*Notes:* ${data.notes || "None"}`;
            const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, "_blank");

        } catch (error) {
            console.error("Failed to send booking request:", error);
            alert("Something went wrong via email. Opening WhatsApp instead.");
            // Fallback
            const message = `*New Booking Request*%0A%0A*Name:* ${data.fullName}%0A*Phone:* ${data.phone}%0A*From:* ${data.pickup}%0A*To:* ${data.destination}%0A*Date:* ${data.date || "Not specified"}%0A*Notes:* ${data.notes || "None"}`;
            const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, "_blank");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="booking" className="py-20 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-50 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-2 block">
                            Book Your Trip
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Ready to Hit the Road?
                        </h2>
                        <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                            Fill out the form to request a driver. We'll review your details and get back to you immediately to confirm the trip.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <span>No payment required now</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <span>Instant WhatsApp confirmation</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <span>Professional verified drivers</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    {...register("fullName", { required: "Name is required" })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    {...register("phone", { required: "Phone number is required" })}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder="+234..."
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
                                    <input
                                        {...register("pickup", { required: "Pickup is required" })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                        placeholder="Lagos"
                                    />
                                    {errors.pickup && <span className="text-red-500 text-xs mt-1">{errors.pickup.message}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                                    <input
                                        {...register("destination", { required: "Destination is required" })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                        placeholder="Abuja"
                                    />
                                    {errors.destination && <span className="text-red-500 text-xs mt-1">{errors.destination.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Travel Date <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <input
                                    type="date"
                                    {...register("date")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <textarea
                                    {...register("notes")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all h-24 resize-none"
                                    placeholder="Any special requests?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2",
                                    isSubmitting && "opacity-75 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Request a Driver
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-slate-500 mt-4">
                                By clicking Request, you agree to being contacted via WhatsApp or Phone.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
