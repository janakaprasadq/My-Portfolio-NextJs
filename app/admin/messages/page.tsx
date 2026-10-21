import { prisma } from "@/lib/prisma";
import MessagesManager from "@/components/admin/MessagesManager";
import { ContactMessage } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];

  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load contact messages:", error);
  }

  return <MessagesManager initialMessages={messages} />;
}
