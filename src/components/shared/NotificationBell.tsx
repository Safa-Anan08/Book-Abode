"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getNotifications,
  markRead,
} from "@/services/notification.service";

import timeAgo from "@/utils/timeAgo";

interface Notification {
  _id: string;
  title: string;
  bookId: string;
  bookTitle: string;
  status: "read" | "unread";
  createdAt: string;
}

export default function NotificationBell() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.notifications);
    } catch {}
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  const unread = notifications.filter(
    (item) => item.status === "unread"
  ).length;

  const handleNotificationClick = async (
    notification: Notification
  ) => {
    if (notification.status === "unread") {
      await markRead(notification._id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === notification._id
            ? {
                ...item,
                status: "read",
              }
            : item
        )
      );
    }

    setOpen(false);

    router.push(`/books/${notification.bookId}`);
  };

  return (
  <div
    className="relative"
    ref={ref}
  >
    <button
      onClick={() => setOpen(!open)}
      className="relative rounded-full border border-[#C3955B]/20 bg-[#261311] p-3 text-[#C3955B] transition hover:border-[#C3955B] hover:bg-[#3A241C]"
    >
      <Bell size={22} />

      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {unread}
        </span>
      )}
    </button>

    {open && (
      <div className="absolute right-0 z-50 mt-4 w-80 overflow-hidden rounded-2xl border border-[#C3955B]/20 bg-[#261311] shadow-2xl">

   
        <div className="border-b border-[#C3955B]/10 bg-[#3A241C] px-5 py-4">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-bold text-white">
              Notifications
            </h3>

            <span className="rounded-full bg-[#C3955B]/20 px-3 py-1 text-xs font-semibold text-[#C3955B]">
              {notifications.length}
            </span>

          </div>

        </div>

        {notifications.length === 0 ? (

          <div className="py-12 text-center">

            <Bell
              size={40}
              className="mx-auto mb-4 text-[#C3955B]/40"
            />

            <p className="text-gray-400">
              No notifications yet
            </p>

          </div>

        ) : (

          <>
            <div className="max-h-[380px] overflow-y-auto">

              {notifications
                .slice(0, 5)
                .map((item) => (

                  <button
                    key={item._id}
                    onClick={() =>
                      handleNotificationClick(item)
                    }
                    className="w-full border-b border-[#C3955B]/10 p-4 text-left transition hover:bg-[#3A241C]"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <h4 className="font-semibold text-white">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-400">
                          {item.bookTitle}
                        </p>

                        <p className="mt-2 text-xs text-gray-500">
                          {timeAgo(item.createdAt)}
                        </p>

                      </div>

                      {item.status === "unread" && (
                        <span className="mt-2 h-3 w-3 rounded-full bg-[#C3955B]" />
                      )}

                    </div>

                  </button>

                ))}

            </div>

            <Link
              href="/dashboard/notifications"
              className="block border-t border-[#C3955B]/10 bg-[#3A241C] p-4 text-center font-semibold text-[#C3955B] transition hover:bg-[#C3955B] hover:text-[#261311]"
            >
              View All Notifications →
            </Link>

          </>

        )}

      </div>
    )}

  </div>
);
}