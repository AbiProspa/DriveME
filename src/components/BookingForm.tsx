"use client";

import { useForm } from "react-hook-form";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

        // Simulate network delay for "sending email"
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Construct WhatsApp Message
        const message = `*New Booking Request*%0A%0A*Name:* ${data.fullName}%0A*Phone:* ${data.phone}%0A*From:* ${data.pickup}%0A*To:* ${data.destination}%0A*Date:* ${data.date || "Not specified"}%0A*Notes:* ${data.notes || "None"}`;

        // WhatsApp URL (Use a placeholder number for now)
        const whatsappUrl = `https://wa.me/234XXXXXXXXXX?text=${message}`;

        // Open WhatsApp
        window.open(whatsappUrl, "_blank");

        setIsSubmitting(false);
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
