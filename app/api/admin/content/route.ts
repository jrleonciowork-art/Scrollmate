import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteData, saveSiteData, SiteData } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COOKIE_NAME = "scrollmate_admin_session";
const SESSION_VALUE = "scrollmate_auth_token_verified_2026";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
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

    const payload = await request.json();
    const { githubToken, ...body } = payload;
    const tokenHeader = request.headers.get("x-github-token") || undefined;
    const effectiveToken = tokenHeader || (typeof githubToken === "string" ? githubToken : undefined);

    if (!body || !body.brands || !body.packages || !body.steps) {
      return NextResponse.json(
        { success: false, error: "Invalid data payload format" },
        { status: 400 }
      );
    }

    const result = await saveSiteData(body as SiteData, effectiveToken);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Failed to persist site data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: body,
      persistedToGitHub: result.persistedToGitHub,
      persistedToDisk: result.persistedToDisk,
      persistedToTmp: result.persistedToTmp,
    });
  } catch (error) {
    console.error("Error in POST /api/admin/content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update content" },
      { status: 500 }
    );
  }
}
