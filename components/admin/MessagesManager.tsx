"use client";

import { useState } from "react";
import { ContactMessage } from "@prisma/client";
import { Mail, MailOpen, Trash2, Reply, Clock, Inbox } from "lucide-react";
import { toggleMessageReadStatus, deleteContactMessage } from "@/app/actions/contact-actions";

export default function MessagesManager({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    messages.length > 0 ? messages[0] : null
  );

  const handleToggleRead = async (message: ContactMessage) => {
    const newStatus = !message.isRead;
    const res = await toggleMessageReadStatus(message.id, newStatus);
    if (res.success) {
      const updatedList = messages.map((m) =>
        m.id === message.id ? { ...m, isRead: newStatus } : m
      );
      setMessages(updatedList);
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...selectedMessage, isRead: newStatus });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const res = await deleteContactMessage(id);
      if (res.success) {
        const remaining = messages.filter((m) => m.id !== id);
        setMessages(remaining);
        if (selectedMessage?.id === id) {
          setSelectedMessage(remaining[0] || null);
        }
      }
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.isRead;
    if (filter === "read") return m.isRead;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Inbox className="mr-3 text-primary" size={26} />
            Client Inquiries & Messages
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Read, manage, and respond to incoming inquiries from your portfolio.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-2 bg-[#0A0118] border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "unread"
                ? "bg-secondary text-white shadow-md shadow-secondary/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "read"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-[#0A0118] border border-white/5 rounded-2xl p-12 text-center">
          <Mail className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-lg font-bold text-white mb-1">No messages yet</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            When visitors use the contact form on your portfolio, their messages will arrive here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
          {/* Message List Sidebar */}
          <div className="lg:col-span-5 bg-[#0A0118] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 font-semibold text-xs text-gray-400 uppercase tracking-wider">
              Inbox ({filteredMessages.length})
            </div>
            <div className="divide-y divide-white/5 overflow-y-auto max-h-[600px] flex-1">
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (!msg.isRead) {
                        handleToggleRead(msg);
                      }
                    }}
                    className={`w-full text-left p-4 transition-all block cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-l-4 border-primary"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold truncate ${msg.isRead ? "text-gray-300" : "text-white flex items-center"}`}>
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-secondary inline-block mr-2 animate-pulse" />
                        )}
                        {msg.name}
                      </span>
                      <span className="text-[11px] text-gray-500 whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-primary truncate mb-1">
                      {msg.subject || "No Subject"}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {msg.message}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Detail View */}
          <div className="lg:col-span-7 bg-[#0A0118] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header actions */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleRead(selectedMessage)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        selectedMessage.isRead
                          ? "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                          : "bg-secondary/20 border-secondary/40 text-secondary"
                      }`}
                    >
                      {selectedMessage.isRead ? (
                        <>
                          <MailOpen size={14} className="mr-1.5" /> Mark as Unread
                        </>
                      ) : (
                        <>
                          <Mail size={14} className="mr-1.5" /> Mark as Read
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject || "Portfolio Inquiry"
                      )}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors"
                    >
                      <Reply size={14} className="mr-1.5" /> Reply via Email
                    </a>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Sender info */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {selectedMessage.subject || "Portfolio Inquiry"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                    <div>
                      From: <span className="text-white font-medium">{selectedMessage.name}</span>
                    </div>
                    <div>
                      Email:{" "}
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-accent hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {new Date(selectedMessage.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                Select a message to view details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
