import { CheckCircle } from "lucide-react";

const benefits = [
    {
        title: "Easy to Use",
        description: "Intuitive and user-friendly interface, no special training required."
    },
    {
        title: "Saves Time",
        description: "Fast and automated transaction process saves canteen operational time."
    },
    {
        title: "Suitable for Various Places",
        description: "Ideal for school, campus, office, and other public facility canteens."
    },
    {
        title: "Real-time Reports",
        description: "Monitor sales and stock in real-time for precise decision-making."
    },
    {
        title: "Cloud-based",
        description: "Data is stored securely in the cloud, accessible anytime and anywhere."
    },
    {
        title: "24/7 Support",
        description: "Support team ready to help anytime for smooth operations."
    }
];

const WhyChooseSection = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Why Choose Invocanteen?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Various advantages that make Invocanteen the best choice for modern canteens.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-blue-400 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;