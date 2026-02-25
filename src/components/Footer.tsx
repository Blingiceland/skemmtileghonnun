"use client";

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--border-subtle)",
                padding: "60px 0 40px",
                background: "var(--bg-secondary)",
            }}
        >
            <div className="section-container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "40px",
                        marginBottom: "48px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 800,
                                fontSize: "1.2rem",
                                color: "var(--text-primary)",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "16px",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 32,
                                    height: 32,
                                    background: "var(--gradient-accent)",
                                    borderRadius: 8,
                                    fontSize: "0.9rem",
                                }}
                            >
                                ✦
                            </span>
                            Skemmtilegt Hönnunarhús
                        </div>
                        <p
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                maxWidth: "300px",
                            }}
                        >
                            Við búum til heimasíður sem vekja athygli og skila árangri.
                            Sérhannað fyrir veitingastaði og skemmtistaði.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "var(--text-secondary)",
                                marginBottom: "20px",
                            }}
                        >
                            Flýtileiðir
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {[
                                { label: "Verkefni", href: "#portfolio" },
                                { label: "Þjónusta", href: "#services" },
                                { label: "Fá tilboð", href: "#quote" },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        color: "var(--text-muted)",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        transition: "color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = "var(--accent-emerald)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.color = "var(--text-muted)")
                                    }
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "var(--text-secondary)",
                                marginBottom: "20px",
                            }}
                        >
                            Hafa samband
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <a
                                href="mailto:info@skemmtilegt.is"
                                style={{
                                    color: "var(--text-muted)",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "var(--accent-emerald)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "var(--text-muted)")
                                }
                            >
                                info@skemmtilegt.is
                            </a>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                Reykjavík, Ísland
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    style={{
                        borderTop: "1px solid var(--border-subtle)",
                        paddingTop: "24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        © {new Date().getFullYear()} Skemmtilegt Hönnunarhús. Öll réttindi
                        áskilin.
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        Hannað og smíðað með{" "}
                        <span style={{ color: "var(--accent-emerald)" }}>♥</span> í
                        Reykjavík
                    </p>
                </div>
            </div>
        </footer>
    );
}
