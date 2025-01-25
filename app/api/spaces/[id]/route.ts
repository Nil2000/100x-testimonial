import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return { status: 401, body: { error: "Unauthorized" } };
  }

  try {
    const space = await db.space.findUnique({
      where: {
        id,
        createdById: session.user.id,
      },
      include: {
        questions: true,
      },
    });
    return NextResponse.json({ space }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
