import { Button } from "@/components/ui/button";
import invocanteenLogo from "@/public/invocanteen-icon-color-long.png";


const Header = () => {
    return (
        <header className="w-full py-4 px-6 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src={invocanteenLogo.src}
                        alt="Invocanteen Logo"
                        className="h-8"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <a href="/login">
                        <Button variant="outline" size="lg" className="btn-bluebutton">
                            Let's Try
                        </Button>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;