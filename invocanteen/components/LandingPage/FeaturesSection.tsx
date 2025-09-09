import { ShoppingCart, History, FileText, TrendingUp } from "lucide-react";

const features = [
    {
        icon: ShoppingCart,
        title: "Transaksi Cepat & Praktis",
        description: "Proses jual beli makanan dan minuman dengan sistem kasir yang mudah dan efisien"
    },
    {
        icon: History,
        title: "Riwayat Order Pelanggan",
        description: "Pendataan lengkap riwayat pembelian untuk analisis dan pelayanan yang lebih baik"
    },
    {
        icon: FileText,
        title: "Invoice Otomatis",
        description: "Cetak struk dan invoice secara otomatis untuk setiap transaksi yang dilakukan"
    },
    {
        icon: TrendingUp,
        title: "Statistik Penjualan",
        description: "Dashboard interaktif dengan laporan penjualan real-time dan analisis mendalam"
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Fitur Unggulan Invocanteen
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Solusi lengkap untuk mengelola kantin modern dengan teknologi terdepan
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
