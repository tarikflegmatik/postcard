import { getPayload } from "payload";
import config from "@payload-config";
import { postcards } from "@/payload-generated-schema";
import { eq, sql } from "@payloadcms/db-postgres/drizzle";

type AnalyticResult = {
  error: string | null;
  status: number;
};

/**
 * Atomically increments `analytics_opens` by 1.
 */
export async function incrementViewAnalytic(
  postcardId: number,
): Promise<AnalyticResult> {
  const payload = await getPayload({ config });

  try {
    await payload.db.drizzle
      .update(postcards)
      .set({
        // postcards.analytics_opens is a numeric column—this becomes `analytics_opens = analytics_opens + 1`
        analytics_opens: sql`${postcards.analytics_opens} + 1`,
      })
      .where(eq(postcards.id, postcardId));

    return { error: null, status: 200 };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error incrementing views";
    return { error: message, status: 500 };
  }
}

/**
 * Atomically increments `analytics_shares` by 1.
 */
export async function incrementShareAnalytic(
  postcardId: number,
): Promise<AnalyticResult> {
  const payload = await getPayload({ config });

  try {
    await payload.db.drizzle
      .update(postcards)
      .set({
        analytics_shares: sql`${postcards.analytics_shares} + 1`,
      })
      .where(eq(postcards.id, postcardId));

    return { error: null, status: 200 };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error incrementing shares";
    return { error: message, status: 500 };
  }
}

/**
 * Atomically creates new registration for the event
 */
