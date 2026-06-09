import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@zosecurity.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "ContraseñaSuperSeguraZ&O";

    if (email === adminEmail && password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "zosecurity_admin_session_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json(
      { status: "error", message: "Credenciales de acceso incorrectas. Verifique sus credenciales." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
}
