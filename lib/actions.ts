"use server";
import { incrementViewAnalytic } from "@/lib/mutations";
import { getPayload } from "payload";
import config from "@payload-config";
import { eq, sql } from "@payloadcms/db-postgres/drizzle";
import {
  invitations,
  invitations_registrations,
} from "@/payload-generated-schema";
import ObjectId from "bson-objectid"; // ← same ID generator Payload uses

export const updateViewAnalyticAction = async (postcardId: number) => {
  await incrementViewAnalytic(postcardId);
};

type InvitationRegistrationState = {
  error: string | null;
  status: number;
} | null;

export const registerToInvitation = async (
  invitationId: number,
  prevState: InvitationRegistrationState,
  formData: FormData,
): Promise<InvitationRegistrationState> => {
  const name = formData.get("name") as string;
  const registeredAt = new Date().toISOString();
  const payload = await getPayload({ config });

  if (!name.trim().length) return { error: "Invalid name.", status: 500 };

  try {
    // Ensure the invitation exists
    const [invitation] = await payload.db.drizzle
      .select()
      .from(invitations)
      .where(eq(invitations.id, invitationId))
      .limit(1);

    if (!invitation) {
      return { error: "Invitation not found", status: 404 };
    }

    // Atomically compute order and insert
    await payload.db.drizzle.transaction(async (tx) => {
      // lock the invitation row
      await tx.execute(
        sql`SELECT id FROM ${invitations} WHERE id = ${invitationId} FOR UPDATE`,
      );

      // compute next _order
      const [{ maxOrder }] = await tx
        .select({
          maxOrder: sql`COALESCE(MAX(${invitations_registrations._order}), 0)`,
        })
        .from(invitations_registrations)
        .where(eq(invitations_registrations._parentID, invitationId));

      const nextOrder = (maxOrder as number) + 1;

      // insert the new registration
      await tx.insert(invitations_registrations).values({
        id: ObjectId().toHexString(),
        _parentID: invitationId,
        fullName: name,
        registeredAt: registeredAt,
        _order: nextOrder,
      });
    });

    return { error: null, status: 201 };
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    // You can customize error messages or status codes as needed
    console.log(errorMessage);
    return { error: errorMessage || "Registration failed", status: 500 };
  }
};
