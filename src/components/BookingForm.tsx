"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    BookingRequest,
    getTodayDateInputValue,
    normalizeBookingInput,
    validateBookingInput,
} from "@/lib/booking";

type SubmissionState = "idle" | "success" | "error";

export default function BookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const minDate = useMemo(() => getTodayDateInputValue(), []);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<BookingRequest>({
        mode: "onBlur",
    });

    const onSubmit = async (formData: BookingRequest) => {
        setSubmissionState("idle");
        setSubmissionMessage("");
        clearErrors();

        const normalizedData = normalizeBookingInput(formData);
        const clientValidation = validateBookingInput(normalizedData);

        if (!clientValidation.isValid) {
            Object.entries(clientValidation.errors).forEach(([field, message]) => {
                if (message) {
                    setError(field as keyof BookingRequest, { type: "manual", message });
                }
            });

            setSubmissionState("error");
            setSubmissionMessage("Please fix the highlighted fields and submit again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(normalizedData),
            });

            const payload = (await response.json().catch(() => null)) as
                | {
                    message?: string;
                    errors?: Partial<Record<keyof BookingRequest, string>>;
                }
                | null;

            if (!response.ok) {
                if (payload?.errors) {
                    Object.entries(payload.errors).forEach(([field, message]) => {
                        if (message) {
                            setError(field as keyof BookingRequest, { type: "server", message });
                        }
                    });
                }

                setSubmissionState("error");
                setSubmissionMessage(
                    payload?.message ?? "Unable to submit your request right now. Please try again."
                );
                return;
            }

            reset();
            setSubmissionState("success");
            setSubmissionMessage(
                payload?.message ??
                "Thanks. Your request has been submitted successfully and our team will contact you shortly."
            );
        } catch (error) {
            console.error("Booking request failed:", error);
            setSubmissionState("error");
            setSubmissionMessage("Unable to submit your request right now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="booking" className="py-20 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-50 z-0" />

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
                            Fill out the form to request a driver. We&apos;ll review your details and get back to you
                            quickly to confirm the trip.
                        </p>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>No payment required now</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Fast booking confirmation</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Professional verified drivers</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    {...register("fullName")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                />
                                {errors.fullName && (
                                    <span className="text-red-600 text-xs mt-1 block">{errors.fullName.message}</span>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    {...register("phone")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder="+234..."
                                    autoComplete="tel"
                                    inputMode="tel"
                                />
                                {errors.phone && (
                                    <span className="text-red-600 text-xs mt-1 block">{errors.phone.message}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="pickup" className="block text-sm font-medium text-slate-700 mb-1">
                                        Pickup Location
                                    </label>
                                    <input
                                        id="pickup"
                                        {...register("pickup")}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                        placeholder="Lagos"
                                        autoComplete="address-level2"
                                    />
                                    {errors.pickup && (
                                        <span className="text-red-600 text-xs mt-1 block">{errors.pickup.message}</span>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
                                        Destination
                                    </label>
                                    <input
                                        id="destination"
                                        {...register("destination")}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                        placeholder="Abuja"
                                        autoComplete="address-level1"
                                    />
                                    {errors.destination && (
                                        <span className="text-red-600 text-xs mt-1 block">{errors.destination.message}</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                                    Travel Date
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    min={minDate}
                                    {...register("date")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                />
                                {errors.date && (
                                    <span className="text-red-600 text-xs mt-1 block">{errors.date.message}</span>
                                )}
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                                    Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <textarea
                                    id="notes"
                                    {...register("notes")}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all h-24 resize-none"
                                    placeholder="Any special requests?"
                                    maxLength={500}
                                />
                                {errors.notes && (
                                    <span className="text-red-600 text-xs mt-1 block">{errors.notes.message}</span>
                                )}
                            </div>

                            {submissionState !== "idle" && (
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className={cn(
                                        "rounded-lg px-3 py-2 text-sm",
                                        submissionState === "success"
                                            ? "bg-emerald-100 text-emerald-900"
                                            : "bg-red-100 text-red-900"
                                    )}
                                >
                                    {submissionMessage}
                                </p>
                            )}

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
                                By clicking Request, you agree to being contacted by the Max-DriveMe team.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
