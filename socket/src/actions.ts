import { METRIC_PAGE } from "./constants";
import { db } from "./db";

export const incrementVisitorCount = async (
  pageType: "request" | "wall",
  spaceId: string
) => {
  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: spaceId,
      },
    });
    if (!spaceExists) {
      return;
    }
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let dateData = await db.metricsDate.findUnique({
      where: {
        date: today,
      },
    });

    if (!dateData) {
      dateData = await db.metricsDate.create({
        data: {
          date: today,
        },
      });
    }

    if (pageType === METRIC_PAGE.REQ_PAGE) {
      await db.requestTestimonialMetrics.upsert({
        where: {
          spaceId_dateId: {
            dateId: dateData.id,
            spaceId: spaceId,
          },
        },
        create: {
          dateId: dateData.id,
          spaceId: spaceId,
          pageViews: 0,
          visitors: 1,
          completedActions: 0,
        },
        update: {
          visitors: { increment: 1 },
        },
      });
    } else if (pageType === METRIC_PAGE.WALL_PAGE) {
      await db.wallOfLoveMetrics.upsert({
        where: {
          spaceId_dateId: {
            dateId: dateData.id,
            spaceId: spaceId,
          },
        },
        create: {
          dateId: dateData.id,
          spaceId: spaceId,
          pageViews: 0,
          visitors: 1,
          timeSpentOnWallOfLove: 0,
        },
        update: {
          visitors: { increment: 1 },
        },
      });
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
};

export const incrementPageViewCount = async (
  pageType: "request" | "wall",
  spaceId: string
) => {
  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: spaceId,
      },
    });
    if (!spaceExists) {
      return;
    }
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let dateData = await db.metricsDate.findUnique({
      where: {
        date: today,
      },
    });

    if (!dateData) {
      dateData = await db.metricsDate.create({
        data: {
          date: today,
        },
      });
    }

    if (pageType === METRIC_PAGE.REQ_PAGE) {
      await db.requestTestimonialMetrics.upsert({
        where: {
          spaceId_dateId: {
            dateId: dateData.id,
            spaceId: spaceId,
          },
        },
        create: {
          dateId: dateData.id,
          spaceId: spaceId,
          pageViews: 1,
          visitors: 0,
          completedActions: 0,
        },
        update: {
          pageViews: { increment: 1 },
        },
      });
    } else if (pageType === METRIC_PAGE.WALL_PAGE) {
      await db.wallOfLoveMetrics.upsert({
        where: {
          spaceId_dateId: {
            dateId: dateData.id,
            spaceId: spaceId,
          },
        },
        create: {
          dateId: dateData.id,
          spaceId: spaceId,
          pageViews: 1,
          visitors: 0,
          timeSpentOnWallOfLove: 0,
        },
        update: {
          pageViews: { increment: 1 },
        },
      });
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
};

export const incrementTimeSpentOnWallOfLove = async (
  spaceId: string,
  timeSpent: number
) => {
  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: spaceId,
      },
    });
    if (!spaceExists) {
      return;
    }
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let dateData = await db.metricsDate.findUnique({
      where: {
        date: today,
      },
    });

    if (!dateData) {
      dateData = await db.metricsDate.create({
        data: {
          date: today,
        },
      });
    }

    await db.wallOfLoveMetrics.upsert({
      where: {
        spaceId_dateId: {
          dateId: dateData.id,
          spaceId: spaceId,
        },
      },
      create: {
        dateId: dateData.id,
        spaceId: spaceId,
        pageViews: 1,
        visitors: 0,
        timeSpentOnWallOfLove: timeSpent,
      },
      update: {
        timeSpentOnWallOfLove: { increment: timeSpent },
      },
    });
  } catch (error) {
    console.error("Error incrementing time spent on wall of love:", error);
  }
};

export const incrementCompletedActions = async (spaceId: string) => {
  try {
    const spaceExists = await db.space.findUnique({
      where: {
        id: spaceId,
      },
    });
    if (!spaceExists) {
      return;
    }
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let dateData = await db.metricsDate.findUnique({
      where: {
        date: today,
      },
    });

    if (!dateData) {
      dateData = await db.metricsDate.create({
        data: {
          date: today,
        },
      });
    }

    await db.requestTestimonialMetrics.upsert({
      where: {
        spaceId_dateId: {
          dateId: dateData.id,
          spaceId: spaceId,
        },
      },
      create: {
        dateId: dateData.id,
        spaceId: spaceId,
        pageViews: 1,
        visitors: 0,
        completedActions: 1,
      },
      update: {
        completedActions: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Error incrementing completed actions:", error);
  }
};
