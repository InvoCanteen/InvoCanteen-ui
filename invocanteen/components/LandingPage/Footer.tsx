import invocanteenLogo from "@/public/invocanteen-icon-color-long.png";

const Footer = () => {
    return (
        <footer className="text-background bg-zinc-800 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src={invocanteenLogo.src}
                            alt="Invocanteen Logo"
                            className="h-10 brightness-0 invert"
                        />
                    </div>

                    <div className="border-t border-background/20 pt-6 space-y-2">
                        <p className="text-background/60 text-sm">
                            © 2025 Invocanteen. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;