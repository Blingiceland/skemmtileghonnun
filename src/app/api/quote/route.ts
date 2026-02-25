import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const businessName = formData.get("businessName") as string;
        const contactName = formData.get("contactName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const businessType = formData.get("businessType") as string;
        const description = formData.get("description") as string;
        const hasExistingSite = formData.get("hasExistingSite") as string;
        const existingSiteUrl = formData.get("existingSiteUrl") as string;

        // Collect files
        const attachments: { filename: string; content: Buffer }[] = [];

        const logo = formData.get("logo") as File | null;
        if (logo && logo.size > 0) {
            const buffer = Buffer.from(await logo.arrayBuffer());
            attachments.push({ filename: `logo-${logo.name}`, content: buffer });
        }

        const menu = formData.get("menu") as File | null;
        if (menu && menu.size > 0) {
            const buffer = Buffer.from(await menu.arrayBuffer());
            attachments.push({ filename: `matseðill-${menu.name}`, content: buffer });
        }

        const photos = formData.getAll("photos") as File[];
        for (const photo of photos) {
            if (photo.size > 0) {
                const buffer = Buffer.from(await photo.arrayBuffer());
                attachments.push({ filename: `mynd-${photo.name}`, content: buffer });
            }
        }

        // Build email HTML
        const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
          🎨 Ný fyrirspurn — Skemmtilegt Hönnunarhús
        </h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f8f9fa;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Fyrirtæki / Staður</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Tengiliður</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${contactName}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Netfang</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Sími</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${phone || "Ekki gefið upp"}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Tegund rekstrar</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${businessType}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Núverandi vefsíða?</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${hasExistingSite || "Ekki svarað"}${existingSiteUrl ? ` — <a href="${existingSiteUrl}">${existingSiteUrl}</a>` : ""
            }</td>
          </tr>
        </table>

        <h2 style="color: #374151; margin-top: 24px;">Lýsing:</h2>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
          <p style="margin: 0; white-space: pre-wrap;">${description}</p>
        </div>

        ${attachments.length > 0
                ? `<p style="margin-top: 20px; color: #6b7280;">📎 ${attachments.length} viðhengi meðfylgjandi</p>`
                : ""
            }

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #9ca3af; font-size: 12px;">
          Sent frá Skemmtilegt Hönnunarhús tilboðsformi — skemmtilegt.is
        </p>
      </div>
    `;

        // Send email via nodemailer
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const notificationEmail = process.env.NOTIFICATION_EMAIL;

        if (!smtpHost || !smtpUser || !smtpPass || !notificationEmail) {
            // If SMTP is not configured, log the submission and return success
            console.log("=== Ný fyrirspurn (SMTP ekki stillt) ===");
            console.log({ businessName, contactName, email, phone, businessType, description });
            console.log(`Viðhengi: ${attachments.length}`);
            console.log("=========================================");
            return NextResponse.json({ success: true, message: "Fyrirspurn móttekin" });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        await transporter.sendMail({
            from: `"Skemmtilegt Hönnunarhús" <${smtpUser}>`,
            to: notificationEmail,
            replyTo: email,
            subject: `🎨 Ný fyrirspurn: ${businessName} (${businessType})`,
            html: htmlBody,
            attachments: attachments.map((a) => ({
                filename: a.filename,
                content: a.content,
            })),
        });

        return NextResponse.json({ success: true, message: "Fyrirspurn send" });
    } catch (error) {
        console.error("Quote form error:", error);
        return NextResponse.json(
            { success: false, message: "Villa kom upp" },
            { status: 500 }
        );
    }
}
