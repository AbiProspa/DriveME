"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            Interstate Travel Service
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Reliable Interstate Driving,{" "}
                            <span className="text-blue-600">Made Simple</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                            Safe, comfortable, and professional interstate trips. Book a
                            verified driver in minutes and travel with peace of mind.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="#booking"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10"
                            >
                                Request a Driver
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                            >
                                How it Works
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Road Scene */}
                <div className="mt-20 relative h-32 md:h-48 w-full max-w-4xl mx-auto opacity-80">
                    {/* Road Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200"></div>

                    {/* Moving Car */}
                    <motion.div
                        initial={{ x: "-10%" }}
                        animate={{ x: "110%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear",
                        }}
                        className="absolute bottom-0.5 left-0"
                    >
                        <div className="relative">
                            <div className="w-16 h-8 bg-blue-600 rounded-t-lg relative z-10 rounded-br-lg shadow-sm">
                                {/* Windows */}
                                <div className="absolute top-1 right-2 w-4 h-3 bg-blue-400 rounded-sm"></div>
                                <div className="absolute top-1 right-7 w-5 h-3 bg-blue-400 rounded-sm"></div>
                            </div>
                            {/* Wheels */}
                            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-slate-800 rounded-full border-2 border-white animate-spin-slow"></div>
                            <div className="absolute -bottom-2 right-2 w-4 h-4 bg-slate-800 rounded-full border-2 border-white animate-spin-slow"></div>
                        </div>
                    </motion.div>

                    {/* Passing Elements (Trees/Signs) - Parallax effect */}
                    <motion.div
                        className="absolute bottom-0 right-10 text-slate-300"
                        initial={{ x: "100%" }}
                        animate={{ x: "-100vw" }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: 1 }}
                    >
                        <MapPin className="w-8 h-8" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
