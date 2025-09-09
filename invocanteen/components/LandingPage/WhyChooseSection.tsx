import { CheckCircle } from "lucide-react";

const benefits = [
    {
        title: "Mudah Digunakan",
        description: "Interface yang intuitif dan user-friendly, tidak memerlukan pelatihan khusus"
    },
    {
        title: "Hemat Waktu",
        description: "Proses transaksi yang cepat dan otomatis menghemat waktu operasional kantin"
    },
    {
        title: "Cocok untuk Berbagai Tempat",
        description: "Ideal untuk kantin sekolah, kampus, perkantoran, dan fasilitas umum lainnya"
    },
    {
        title: "Laporan Real-time",
        description: "Monitor penjualan dan stok secara real-time untuk pengambilan keputusan yang tepat"
    },
    {
        title: "Cloud-based",
        description: "Data tersimpan aman di cloud, dapat diakses kapan saja dan dimana saja"
    },
    {
        title: "Support 24/7",
        description: "Tim support yang siap membantu kapan saja untuk kelancaran operasional"
    }
];

const WhyChooseSection = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Mengapa Memilih Invocanteen?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Berbagai keunggulan yang membuat Invocanteen menjadi pilihan terbaik untuk kantin modern
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