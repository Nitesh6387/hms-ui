const servicesData = [
    {
        title: "General Checkup",
        description: "Regular health assessments to keep track of your well-being.",
        points: [
            "✔ Routine health screening",
            "✔ Blood pressure & cholesterol check",
            "✔ Personalized health advice",
            "✔ Diet & lifestyle recommendations",
        ],
        icon: "🩺",
    },
    {
        title: "Emergency Care",
        description: "24/7 emergency support to handle critical medical situations.",
        points: [
            "✔ Immediate medical assistance",
            "✔ 24/7 ambulance service",
            "✔ Fully equipped ICU & trauma care",
            "✔ On-call specialist doctors",
        ],
        icon: "🚑",
    },
    {
        title: "Surgical Procedures",
        description: "Advanced and minimally invasive surgical treatments.",
        points: [
            "✔ Experienced surgeons & specialists",
            "✔ Modern operation theaters",
            "✔ Minimally invasive techniques",
            "✔ Post-surgery recovery support",
        ],
        icon: "👨‍⚕️",
    },
    {
        title: "Vaccinations",
        description: "Protect yourself and your family with essential immunizations.",
        points: [
            "✔ COVID-19 vaccinations",
            "✔ Flu shots & boosters",
            "✔ Travel vaccines",
            "✔ Pediatric immunization programs",
        ],
        icon: "💉",
    },
    {
        title: "Dental Care",
        description: "Complete oral healthcare for a perfect smile.",
        points: [
            "✔ Teeth cleaning & whitening",
            "✔ Cavity fillings & root canals",
            "✔ Braces & orthodontics",
            "✔ Dental implants & extractions",
        ],
        icon: "🦷",
    },
    {
        title: "Laboratory Tests",
        description: "Accurate and timely diagnostic lab tests.",
        points: [
            "✔ Blood tests & screenings",
            "✔ DNA & genetic testing",
            "✔ Pathology & microbiology",
            "✔ Rapid test results",
        ],
        icon: "🧬",
    },
    // {
    //     title: "Piles Treatment",
    //     description: "Effective treatment and management of piles (hemorrhoids).",
    //     points: [
    //       "✔ Non-surgical & surgical options",
    //       "✔ Laser treatment available",
    //       "✔ Expert consultation & diagnosis",
    //       "✔ Fast recovery with minimal pain",
    //     ],
    //     icon: "🚑",
    //   },
];

const Services = () => {
    return (
        <section className="bg-gray-100 py-16 px-6 md:px-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Medical Services</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                    We provide a variety of top-quality healthcare services to ensure your well-being.
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-6  rounded-lg shadow-lg border border-gray-300 text-center transition duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="text-6xl mb-4">{service.icon}</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-700 mb-4">{service.description}</p>
                            <ul className="text-gray-600 text-left mx-auto max-w-xs">
                                {service.points.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
