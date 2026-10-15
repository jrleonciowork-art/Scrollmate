import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteData, saveSiteData, SiteData } from "@/lib/site-data";

const COOKIE_NAME = "scrollmate_admin_session";
const SESSION_VALUE = "scrollmate_auth_token_verified_2026";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);

    if (!session || session.value !== SESSION_VALUE) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body: SiteData = await request.json();

    if (!body || !body.brands || !body.packages || !body.steps) {
      return NextResponse.json(
        { success: false, error: "Invalid data payload format" },
        { status: 400 }
      );
    }

    const saved = saveSiteData(body);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to persist site data file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Error in POST /api/admin/content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update content" },
      { status: 500 }
    );
  }
}
