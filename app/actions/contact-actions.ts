"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/auth-guard";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactMessage(data: ContactFormData) {
  try {
    // Honeypot check for bots (must remain empty)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return { success: true };
    }

    const name = data.name?.trim() || "";
    const email = data.email?.trim() || "";
    const subject = data.subject?.trim() || "Portfolio Inquiry";
    const message = data.message?.trim() || "";

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    if (name.length > 100) {
      return { success: false, error: "Name is too long (maximum 100 characters)." };
    }

    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      return { success: false, error: "Please provide a valid email address." };
    }

    if (subject.length > 150) {
      return { success: false, error: "Subject is too long (maximum 150 characters)." };
    }

    if (message.length < 5) {
      return { success: false, error: "Message is too short (minimum 5 characters)." };
    }

    if (message.length > 5000) {
      return { success: false, error: "Message is too long (maximum 5000 characters)." };
    }

    const saved = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/messages");

    return { success: true, messageId: saved.id };
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return { success: false, error: "Failed to send message. Please try again or email directly." };
  }
}

export async function toggleMessageReadStatus(id: string, isRead: boolean) {
  await assertAdminSession();

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/messages");
    return { success: true, updated };
  } catch (error) {
    console.error("Error updating message status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteContactMessage(id: string) {
  await assertAdminSession();

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: "Failed to delete message." };
  }
}
