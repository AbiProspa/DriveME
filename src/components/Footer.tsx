import { Phone, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold">
                                D
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                DriveMe
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Reliable interstate driving services. We connect you with verified professionals for safe and comfortable journeys across Nigeria.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link href="#booking" className="hover:text-white transition-colors">Book a Driver</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4" />
                                <span>080-XXX-XXXX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MessageCircle className="w-4 h-4" />
                                <span>Chat on WhatsApp</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <span>Serving all major interstate routes</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} DriveMe Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
