"use client";

import { useState, useRef, useEffect } from "react";

interface Project {
    name: string;
    description: string;
    url: string;
    status: "live" | "development";
    tags: string[];
    color: string;
}

const projects: Project[] = [
    {
        name: "Dillon",
        description:
            "Tónlistar- og viðburðastaður í hjarta Reykjavíkur. Sérhannaðar síður fyrir dagskrá, viðburði og bókanir.",
        url: "https://dillon.is",
        status: "live",
        tags: ["Viðburðir", "Bókanir", "Dagskrá"],
        color: "#10b981",
    },
    {
        name: "Pablo Discobar",
        description:
            "Tapas og kokteilar á líflegum stað í hjarta Reykjavíkur. Litrík hönnun og þægilegt bókunarkerfi.",
        url: "https://pablodiscobar.is/",
        status: "live",
        tags: ["Kokteilar", "Tapas", "Stemmning"],
        color: "#ec4899",
    },
    {
        name: "Macondo",
        description:
            "Nýr og spennandi staður sem er að opna. Sérhannað vefumhverfi í vinnslu núna.",
        url: "",
        status: "development",
        tags: ["Í vinnslu", "Bráðum tilbúið"],
        color: "#8b5cf6",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Preview area */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
                    overflow: "hidden",
                    borderBottom: `1px solid var(--border-subtle)`,
                }}
            >
                {project.status === "live" && project.url ? (
                    <>
                        <iframe
                            src={project.url}
                            title={`${project.name} preview`}
                            onLoad={() => setIsLoaded(true)}
                            style={{
                                width: "200%",
                                height: "200%",
                                border: "none",
                                transform: "scale(0.5)",
                                transformOrigin: "top left",
                                pointerEvents: isHovered ? "auto" : "none",
                                opacity: isLoaded ? 1 : 0,
                                transition: "opacity 0.5s ease",
                            }}
                        />
                        {!isLoaded && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--text-muted)",
                                    fontSize: "0.9rem",
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                <span style={{ animation: "shimmer 2s linear infinite", background: `linear-gradient(90deg, ${project.color}33, ${project.color}66, ${project.color}33)`, backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    Hleður forskoðun...
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "14px",
                                background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                                border: `1px solid ${project.color}30`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.5rem",
                                animation: "pulseGlow 3s ease-in-out infinite",
                            }}
                        >
                            🚧
                        </div>
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                color: project.color,
                            }}
                        >
                            Í vinnslu
                        </span>
                    </div>
                )}

                {/* Status badge */}
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-heading)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        background:
                            project.status === "live"
                                ? "rgba(16, 185, 129, 0.15)"
                                : "rgba(139, 92, 246, 0.15)",
                        color: project.status === "live" ? "#10b981" : "#8b5cf6",
                        border: `1px solid ${project.status === "live"
                            ? "rgba(16, 185, 129, 0.25)"
                            : "rgba(139, 92, 246, 0.25)"
                            }`,
                    }}
                >
                    {project.status === "live" ? "● Live" : "◌ Í vinnslu"}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        marginBottom: "8px",
                        color: "var(--text-primary)",
                    }}
                >
                    {project.name}
                </h3>
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "16px",
                        flex: 1,
                    }}
                >
                    {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                padding: "4px 12px",
                                borderRadius: "8px",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                background: `${project.color}10`,
                                color: project.color,
                                border: `1px solid ${project.color}20`,
                                fontFamily: "var(--font-heading)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                {project.status === "live" && project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            color: project.color,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            textDecoration: "none",
                            fontFamily: "var(--font-heading)",
                            transition: "gap 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
                        onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
                    >
                        Skoða síðu <span>→</span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Portfolio() {
    return (
        <section
            id="portfolio"
            style={{
                padding: "120px 0",
                position: "relative",
            }}
        >
            {/* Background accent */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div className="section-container" style={{ position: "relative" }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <span
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "var(--accent-emerald)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontFamily: "var(--font-heading)",
                            marginBottom: "12px",
                            display: "block",
                        }}
                    >
                        Verkefnin okkar
                    </span>
                    <h2 className="section-title" style={{ textAlign: "center" }}>
                        Síður sem við höfum hannað
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ textAlign: "center", margin: "0 auto" }}
                    >
                        Sérhver síða er einstök og hönnuð til þess að endurspegla
                        menningu og stemnmingu staðarins
                    </p>
                </div>

                {/* Projects Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={project.name} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
