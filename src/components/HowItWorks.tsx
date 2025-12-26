import { ClipboardList, PhoneCall, Car } from "lucide-react";

const steps = [
    {
        icon: ClipboardList,
        title: "1. Submit Your Details",
        description: "Fill a simple form with your pickup location, destination, and travel date.",
    },
    {
        icon: PhoneCall,
        title: "2. We Contact You",
        description: "Our diverse team reviews your request and calls or messages you to confirm details.",
    },
    {
        icon: Car,
        title: "3. Enjoy Your Trip",
        description: "A professional driver picks you up on time for a safe and comfortable journey.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Booking a reliable interstate driver has never been easier. Just three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                            {/* Step Number Background */}
                            <div className="absolute -top-4 -right-4 text-9xl font-bold text-slate-100/50 select-none -z-10">
                                {index + 1}
                            </div>

                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <step.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
