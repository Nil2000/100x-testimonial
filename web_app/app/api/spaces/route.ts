import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const spaces = await db.space.findMany({
      where: {
        createdById: session.user.id,
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
