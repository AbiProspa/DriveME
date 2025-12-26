import { BadgeCheck, ThumbsUp, Wallet } from "lucide-react";

export default function TrustSection() {
    return (
        <section className="py-12 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-4">
                        <BadgeCheck className="w-10 h-10 text-green-500 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900">Verified Drivers</h4>
                        <p className="text-sm text-slate-600">Every driver is vetted and professional.</p>
                    </div>
                    <div className="p-4">
                        <ThumbsUp className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900">Satisfaction Guarantee</h4>
                        <p className="text-sm text-slate-600">We stay in touch until you arrive.</p>
                    </div>
                    <div className="p-4">
                        <Wallet className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900">Transparent Pricing</h4>
                        <p className="text-sm text-slate-600">No hidden fees. Discuss pricing upfront.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
