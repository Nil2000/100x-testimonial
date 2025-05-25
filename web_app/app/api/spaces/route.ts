import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const spaces = await db.space.findMany({
      where: {
        createdById: session.user.id,
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
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
}
