"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  markRead,
} from "@/services/notification.service";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const res = await getNotifications();

    setNotifications(res.notifications);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id: string) => {
    await markRead(id);

    loadNotifications();
  };

  return (
    <div className="mx-auto max-w-5xl p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Notifications
      </h1>

      <div className="space-y-5">

        {notifications.map((item: any) => (
          <div
            key={item._id}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  item.status === "unread"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>

            </div>

            <div className="mt-4 space-y-2 text-gray-700">

              <p>
                <strong>Book:</strong>{" "}
                {item.bookTitle}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {item.reason}
              </p>

              <p>
                <strong>Message:</strong>{" "}
                {item.message}
              </p>

              <p>
                <strong>Reported By:</strong>{" "}
                {item.reportedBy}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>

            </div>

            {item.status === "unread" && (
              <button
                onClick={() =>
                  handleRead(item._id)
                }
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Mark as Read
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}