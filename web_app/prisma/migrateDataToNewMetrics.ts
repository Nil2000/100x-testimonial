import { db } from "@/lib/db";

// async function seedDb() {
//   await db.$executeRaw(
//     // `-- INSERT INTO 'MetricsDate' ('id', 'date', 'createdAt', 'updatedAt') SELECT 'date_' || md5(date::text), date, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM 'DailyMetrics' GROUP BY date ON CONFLICT (date) DO NOTHING`,
//     `INSERT INTO METRICSDATE (id)`
//   )
// }
