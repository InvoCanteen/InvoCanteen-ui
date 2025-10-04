import { Button } from "@/components/ui/button";
import heroIllustration from "@/public/hero-illustration.jpg";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero px-6 py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-foreground">Smart Cashier for</span>
                            <br />
                            <span className="bg-gradient-primary bg-clip-text text-blue-500">
                                Modern Canteen
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                            Manage canteen transactions easily, quickly, and accurately.
                            A digital cashier solution specially designed for the needs of a modern canteen.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="/login">
                            <Button variant="outline" size="lg" className="text-base btn-bluebutton">
                                Lets Try
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" className="text-base">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Illustration */}
                <div className="relative">
                    <div className="relative bg-card rounded-2xl shadow-soft overflow-hidden">
                        <img
                            src={heroIllustration.src}
                            alt="Modern Canteen Cashier"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full opacity-30 bg-blue-800"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-primary rounded-full opacity-40 bg-blue-800"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;