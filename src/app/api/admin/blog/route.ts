import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { saveBlogPost, deleteBlogPost } from "@/utils/sheets";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === "zosecurity_admin_session_token";
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = await saveBlogPost(body);
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Falta el parámetro ID" }, { status: 400 });
    }
    await deleteBlogPost(id);
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
