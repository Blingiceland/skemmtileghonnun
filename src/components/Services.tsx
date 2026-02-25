"use client";

import { useEffect, useRef, useState } from "react";

const services = [
    {
        icon: "🎨",
        title: "Sérhönnun",
        description:
            "Einstök hönnun sem endurspeglar vörumerkið þitt. Engar sniðmátar — allt frá grunni.",
    },
    {
        icon: "📱",
        title: "Sveigjanlegt útlit",
        description:
            "Síðan þín lítur vel út á öllum tækjum — sími, spjaldtölva og tölva.",
    },
    {
        icon: "📋",
        title: "Matseðlar á netinu",
        description:
            "Rafrænn matseðill sem er auðvelt að uppfæra. Gestir þínir geta alltaf séð nýjasta boðið.",
    },
    {
        icon: "📅",
        title: "Bókunarkerfi",
        description:
            "Innbyggt bókunarkerfi þar sem gestir geta pantað borð eða viðburði á netinu.",
    },
    {
        icon: "⚡",
        title: "Hröð og örugg",
        description:
            "Síðan þín hleðst hratt og er örugg. Nútíma tækni og bestu venjur.",
    },
    {
        icon: "🔧",
        title: "Viðhald og stuðningur",
        description:
            "Við sjáum um allt — uppfærslur, breytingar og tæknilegan stuðning.",
    },
];

function ServiceCard({
    service,
    index,
}: {
    service: (typeof services)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="glass-card"
            style={{
                padding: "32px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
            }}
        >
            <div
                style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "var(--gradient-card)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    marginBottom: "20px",
                }}
            >
                {service.icon}
            </div>
            <h3
                style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                    color: "var(--text-primary)",
                }}
            >
                {service.title}
            </h3>
            <p
                style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                }}
            >
                {service.description}
            </p>
        </div>
    );
}

export default function Services() {
    return (
        <section
            id="services"
            style={{
                padding: "120px 0",
                background: "var(--bg-secondary)",
                position: "relative",
            }}
        >
            {/* Top/bottom subtle borders */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    right: "10%",
                    height: "1px",
                    background:
                        "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
                }}
            />

            <div className="section-container">
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <span
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "var(--accent-gold)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontFamily: "var(--font-heading)",
                            marginBottom: "12px",
                            display: "block",
                        }}
                    >
                        Þjónustan okkar
                    </span>
                    <h2 className="section-title" style={{ textAlign: "center" }}>
                        Allt sem þú þarft
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ textAlign: "center", margin: "0 auto" }}
                    >
                        Við bjóðum upp á heildstæða vefþjónustu frá hönnun til hýsingar
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
