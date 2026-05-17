import {
  assertSpaceOwnership,
  forbiddenJsonResponse,
  requireAuthApi,
} from "@/lib/authGuards";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireAuthApi();
  if ("response" in authResult) {
    return authResult.response;
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return forbiddenJsonResponse(ownership.error);
  }

  try {
    const space = await db.space.findFirst({
      where: {
        id,
        createdById: authResult.userId,
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
            id: true,
            title: true,
            message: true,
          },
        },
      },
    });
    return NextResponse.json({ space }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
