import { Shield, Clock, Map } from "lucide-react";

export default function About() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <Shield className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="font-bold text-slate-900 mb-2">Safe & Secure</h3>
                                <p className="text-sm text-slate-600">Verified pro drivers for your peace of mind.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl mt-8">
                                <Clock className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="font-bold text-slate-900 mb-2">On Time</h3>
                                <p className="text-sm text-slate-600">Punctual pickups and efficient routes.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Stress-Free <span className="text-blue-600">Interstate Travel</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            We provide dependable drivers for interstate journeys across major routes in Nigeria.
                            Whether it’s a business trip, family visit, or moving to a new state, we make the journey smooth.
                        </p>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Forget the hassle of public parks or driving yourself for long hours.
                            Our professional drivers ensure you arrive safely and comfortably.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
