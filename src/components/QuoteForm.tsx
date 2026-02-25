"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

interface FormData {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    businessType: string;
    description: string;
    hasExistingSite: string;
    existingSiteUrl: string;
}

const businessTypes = [
    "Bar",
    "Veitingastaður",
    "Kaffihús",
    "Næturklúbbur",
    "Skemmtistaður",
    "Annað",
];

export default function QuoteForm() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        businessType: "",
        description: "",
        hasExistingSite: "",
        existingSiteUrl: "",
    });
    const [files, setFiles] = useState<{
        logo: File | null;
        photos: FileList | null;
        menu: File | null;
    }>({
        logo: null,
        photos: null,
        menu: null,
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const body = new FormData();
            Object.entries(formData).forEach(([key, val]) => body.append(key, val));
            if (files.logo) body.append("logo", files.logo);
            if (files.menu) body.append("menu", files.menu);
            if (files.photos) {
                Array.from(files.photos).forEach((f) => body.append("photos", f));
            }

            const res = await fetch("/api/quote", { method: "POST", body });
            if (!res.ok) throw new Error("Failed");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <section
                id="quote"
                style={{
                    padding: "120px 0",
                    position: "relative",
                }}
            >
                <div
                    className="section-container"
                    style={{
                        maxWidth: "600px",
                        textAlign: "center",
                    }}
                >
                    <div
                        className="glass-card"
                        style={{
                            padding: "60px 40px",
                            animation: "fadeInUp 0.6s ease-out",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "3.5rem",
                                marginBottom: "20px",
                            }}
                        >
                            ✓
                        </div>
                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "1.8rem",
                                fontWeight: 800,
                                marginBottom: "16px",
                                color: "var(--accent-emerald)",
                            }}
                        >
                            Takk fyrir!
                        </h2>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "1.05rem",
                                lineHeight: 1.7,
                            }}
                        >
                            Við höfum fengið fyrirspurn þína og munum hafa samband innan{" "}
                            <strong style={{ color: "var(--text-primary)" }}>24 klukkustunda</strong>{" "}
                            með verðtilboð.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="quote"
            style={{
                padding: "120px 0",
                position: "relative",
            }}
        >
            {/* Background */}
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    right: "-10%",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div className="section-container" style={{ maxWidth: "800px", position: "relative" }}>
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "48px",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.6s ease",
                    }}
                >
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
                        Fá tilboð
                    </span>
                    <h2 className="section-title" style={{ textAlign: "center" }}>
                        Byrjaðu verkefnið þitt
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ textAlign: "center", margin: "0 auto" }}
                    >
                        Fylltu út formið og við sendum þér verðtilboð strax og hægt er
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="glass-card"
                    style={{
                        padding: "40px",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.6s ease 0.2s",
                    }}
                >
                    {/* Business & Contact Info */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <div>
                            <label className="form-label">Nafn fyrirtækis / staðar *</label>
                            <input
                                className="form-field"
                                type="text"
                                name="businessName"
                                required
                                placeholder="t.d. Kaffi Laugavegur"
                                value={formData.businessName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="form-label">Tengiliður *</label>
                            <input
                                className="form-field"
                                type="text"
                                name="contactName"
                                required
                                placeholder="Fullt nafn"
                                value={formData.contactName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <div>
                            <label className="form-label">Netfang *</label>
                            <input
                                className="form-field"
                                type="email"
                                name="email"
                                required
                                placeholder="netfang@dæmi.is"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="form-label">Símanúmer</label>
                            <input
                                className="form-field"
                                type="tel"
                                name="phone"
                                placeholder="xxx-xxxx"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Business Type */}
                    <div style={{ marginBottom: "20px" }}>
                        <label className="form-label">Tegund rekstrar *</label>
                        <select
                            className="form-field"
                            name="businessType"
                            required
                            value={formData.businessType}
                            onChange={handleChange}
                            style={{ cursor: "pointer" }}
                        >
                            <option value="">Veldu tegund...</option>
                            {businessTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Existing site */}
                    <div style={{ marginBottom: "20px" }}>
                        <label className="form-label">Ertu með heimasíðu núna?</label>
                        <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                            {["Já", "Nei"].map((opt) => (
                                <label
                                    key={opt}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        color: "var(--text-secondary)",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="hasExistingSite"
                                        value={opt}
                                        checked={formData.hasExistingSite === opt}
                                        onChange={handleChange}
                                        style={{ accentColor: "var(--accent-emerald)" }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    {formData.hasExistingSite === "Já" && (
                        <div style={{ marginBottom: "20px" }}>
                            <label className="form-label">Slóð á núverandi síðu</label>
                            <input
                                className="form-field"
                                type="url"
                                name="existingSiteUrl"
                                placeholder="https://..."
                                value={formData.existingSiteUrl}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div style={{ marginBottom: "24px" }}>
                        <label className="form-label">Lýsing á verkefninu *</label>
                        <textarea
                            className="form-field"
                            name="description"
                            required
                            rows={4}
                            placeholder="Segðu okkur frá staðnum þínum og hvers konar síðu þú sérð fyrir þér..."
                            value={formData.description}
                            onChange={handleChange}
                            style={{ resize: "vertical", minHeight: "100px" }}
                        />
                    </div>

                    {/* File Uploads */}
                    <div style={{ marginBottom: "32px" }}>
                        <label
                            className="form-label"
                            style={{ marginBottom: "16px", display: "block" }}
                        >
                            Hlaða upp gögnum (valfrjálst)
                        </label>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {/* Logo */}
                            <div className="file-upload">
                                <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        fontFamily: "var(--font-heading)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Logo
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    {files.logo ? files.logo.name : "PNG, JPG, SVG"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*,.svg,.pdf"
                                    onChange={(e) =>
                                        setFiles((f) => ({ ...f, logo: e.target.files?.[0] || null }))
                                    }
                                />
                            </div>

                            {/* Photos */}
                            <div className="file-upload">
                                <span style={{ fontSize: "1.5rem" }}>📸</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        fontFamily: "var(--font-heading)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Myndir af staðnum
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    {files.photos
                                        ? `${files.photos.length} skrá(r) valdar`
                                        : "Margar myndir"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        setFiles((f) => ({ ...f, photos: e.target.files }))
                                    }
                                />
                            </div>

                            {/* Menu */}
                            <div className="file-upload">
                                <span style={{ fontSize: "1.5rem" }}>📄</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        fontFamily: "var(--font-heading)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Matseðill
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    {files.menu ? files.menu.name : "PDF eða mynd"}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    onChange={(e) =>
                                        setFiles((f) => ({ ...f, menu: e.target.files?.[0] || null }))
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === "sending"}
                        style={{
                            width: "100%",
                            padding: "18px",
                            fontSize: "1.05rem",
                            opacity: status === "sending" ? 0.7 : 1,
                        }}
                    >
                        {status === "sending" ? (
                            <>
                                <span
                                    style={{
                                        display: "inline-block",
                                        animation: "shimmer 1.5s linear infinite",
                                    }}
                                >
                                    Sendi fyrirspurn...
                                </span>
                            </>
                        ) : (
                            <>
                                Senda fyrirspurn
                                <span style={{ fontSize: "1.2rem" }}>→</span>
                            </>
                        )}
                    </button>

                    {status === "error" && (
                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "16px",
                                color: "#ef4444",
                                fontSize: "0.9rem",
                            }}
                        >
                            Villa kom upp. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst.
                        </p>
                    )}
                </form>
            </div>

            {/* Responsive grid fix */}
            <style jsx>{`
        @media (max-width: 640px) {
          form > div:first-child,
          form > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
