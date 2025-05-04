"use server";
import { incrementViewAnalytic } from "@/lib/mutations";
import { getPayload } from "payload";
import config from "@payload-config";

export const updateViewAnalyticClient = async (postcardId: number) => {
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
  const payload = await getPayload({ config });

  // Step 1: Get current invitation
  const invitation = await payload.findByID({
    collection: "invitations",
    id: invitationId,
  });

  if (!invitation) {
    return { error: "Invitation not found", status: 404 };
  }

  // Step 2: Append new registration
  const updatedRegistrations = [
    ...(invitation.registrations || []),
    {
      fullName: name,
      registeredAt: new Date().toISOString(),
    },
  ];

  // Step 3: Save updated array
  await payload.update({
    collection: "invitations",
    id: invitationId,
    data: {
      registrations: updatedRegistrations,
    },
  });

  return { error: null, status: 201 };
};
