"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "Verkefni", href: "#portfolio" },
    { label: "Þjónusta", href: "#services" },
    { label: "Tilboð", href: "#quote" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="section-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Brand */}
                <a
                    href="#"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "1.3rem",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36,
                            background: "var(--gradient-accent)",
                            borderRadius: 10,
                            fontSize: "1.1rem",
                        }}
                    >
                        ✦
                    </span>
                    <span>
                        Skemmtilegt{" "}
                        <span style={{ color: "var(--accent-emerald)" }}>Hönnunarhús</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "32px",
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontWeight: 500,
                                fontSize: "0.95rem",
                                transition: "color 0.3s ease",
                                fontFamily: "var(--font-heading)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--accent-emerald)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--text-secondary)")
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#quote" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                        Fá tilboð
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Opna valmynd"
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "var(--text-primary)",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                    }}
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "rgba(10, 10, 15, 0.98)",
                        backdropFilter: "blur(20px)",
                        borderBottom: "1px solid var(--glass-border)",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontWeight: 500,
                                fontSize: "1.1rem",
                                fontFamily: "var(--font-heading)",
                                padding: "8px 0",
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#quote"
                        className="btn-primary"
                        onClick={() => setMobileOpen(false)}
                        style={{ textAlign: "center", marginTop: "8px" }}
                    >
                        Fá tilboð
                    </a>
                </div>
            )}
        </nav>
    );
}
