import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                        D
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                        DriveMe
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <a
                        href="https://wa.me/234XXXXXXXXXX" // TODO: Add real number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors text-sm font-medium"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                    </a>
                    <a
                        href="#booking"
                        className={cn(
                            "bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all",
                            "flex items-center gap-2"
                        )}
                    >
                        <Phone className="w-4 h-4" />
                        <span>Book a Driver</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
