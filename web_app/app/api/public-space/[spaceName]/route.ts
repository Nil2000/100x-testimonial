import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ spaceName: string }> }
) {
  const { spaceName } = await params;

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!spaceName) {
    return NextResponse.json(
      { error: "Space name is required" },
      { status: 400 }
    );
  }

  try {
    const existingSpace = await db.space.findFirst({
      where: {
        name: spaceName,
        deletedAt: null,
      },
      include: {
        questions: {
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        thankyouSpace: {
          select: {
            title: true,
            message: true,
          },
        },
      },
    });

    if (!existingSpace) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    if (!existingSpace.isPublished) {
      return NextResponse.json(
        { error: "Space not published" },
        { status: 400 }
      );
    }

    return NextResponse.json({ space: existingSpace }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
