import { ShoppingCart, History, FileText, TrendingUp } from "lucide-react";

const features = [
    {
        icon: ShoppingCart,
        title: "Fast & Practical Transactions",
        description: "Process food and beverage sales with an easy and efficient cashier system."
    },
    {
        icon: History,
        title: "Customer Order History",
        description: "Complete data collection of purchase history for better analysis and service."
    },
    {
        icon: FileText,
        title: "Automatic Invoicing",
        description: "Print receipts and invoices automatically for every transaction."
    },
    {
        icon: TrendingUp,
        title: "Sales Statistics",
        description: "Interactive dashboard with real-time sales reports and in-depth analysis."
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Invocanteen's Superior Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A complete solution for managing modern canteens with leading technology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
