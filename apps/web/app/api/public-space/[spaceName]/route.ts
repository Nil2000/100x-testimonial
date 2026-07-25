import {
  assertSpaceOwnershipByName,
  forbiddenJsonResponse,
  requireAuthApi,
} from "@/lib/authGuards";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ spaceName: string }> }
) {
  const { spaceName } = await params;

  const authResult = await requireAuthApi();
  if ("response" in authResult) {
    return authResult.response;
  }

  const ownership = await assertSpaceOwnershipByName(
    authResult.userId,
    spaceName
  );
  if ("error" in ownership) {
    return forbiddenJsonResponse(ownership.error);
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
        id: ownership.space.id,
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

    return NextResponse.json({ space: existingSpace }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
