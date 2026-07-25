import { requireAuthApi } from "@/lib/authGuards";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const authResult = await requireAuthApi();
  if ("response" in authResult) {
    return authResult.response;
  }

  try {
    const spaces = await db.space.findMany({
      where: {
        createdById: authResult.userId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        logo: true,
      },
    });

    return NextResponse.json(
      {
        data: spaces,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
