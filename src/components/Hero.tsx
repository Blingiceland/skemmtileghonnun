"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;
            heroRef.current.style.setProperty("--mouse-x", `${x}%`);
            heroRef.current.style.setProperty("--mouse-y", `${y}%`);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "var(--gradient-hero)",
            }}
        >
            {/* Animated gradient orbs */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "float 8s ease-in-out infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "5%",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "float 10s ease-in-out infinite reverse",
                }}
            />

            {/* Mouse-follow glow */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.04), transparent 40%)",
                    pointerEvents: "none",
                }}
            />

            {/* Grid pattern overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }}
            />

            <div
                className="section-container"
                style={{
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "900px",
                }}
            >
                {/* Badge */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 20px",
                        background: "rgba(16, 185, 129, 0.08)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        borderRadius: "100px",
                        fontSize: "0.85rem",
                        color: "var(--accent-emerald)",
                        fontWeight: 500,
                        marginBottom: "32px",
                        fontFamily: "var(--font-heading)",
                    }}
                >
                    <span style={{ fontSize: "0.7rem" }}>●</span>
                    Fagleg heimasíðugerð fyrir veitingastaði, bara og skemmtistaði
                </div>

                {/* Heading */}
                <h1
                    className="animate-fade-in-up stagger-1"
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: "24px",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Heimasíður sem{" "}
                    <span
                        style={{
                            background:
                                "linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-gold) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        vekja athygli
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="animate-fade-in-up stagger-2"
                    style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                        color: "var(--text-secondary)",
                        maxWidth: "640px",
                        margin: "0 auto 40px",
                        lineHeight: 1.7,
                    }}
                >
                    Við hönnun og smíðum vefsíður sem endurspegla einstaka
                    stemmningu þíns staðar. Sérhannað fyrir bara, veitingastaði og
                    skemmtistaði.
                </p>

                {/* CTA Buttons */}
                <div
                    className="animate-fade-in-up stagger-3"
                    style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <a href="#portfolio" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
                        Sjá verkefnin okkar
                        <span style={{ fontSize: "1.2rem" }}>→</span>
                    </a>
                    <a href="#quote" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
                        Fá tilboð
                    </a>
                </div>

                {/* Stats */}
                <div
                    className="animate-fade-in-up stagger-4"
                    style={{
                        display: "flex",
                        gap: "48px",
                        justifyContent: "center",
                        marginTop: "64px",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        { value: "100%", label: "Sérhannaðar síður" },
                        { value: "24klst", label: "Verðtilboð" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--accent-emerald)",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="animate-fade-in stagger-5"
                style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    animation: "float 3s ease-in-out infinite",
                }}
            >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-heading)" }}>
                    Skrolla niður
                </span>
                <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>↓</span>
            </div>
        </section>
    );
}
