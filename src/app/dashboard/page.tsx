"use client";

import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getRecentActivity,
} from "@/services/admin.service";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";


export default function DashboardPage() {
  const [stats, setStats] =
    useState(null);

  const [activity, setActivity] =
    useState(null);

  useEffect(() => {
    const load = async () => {
      const statsRes =
        await getDashboardStats();

      const activityRes =
        await getRecentActivity();

      setStats(statsRes);

      setActivity(activityRes);
    };

    load();
  }, []);

  if (!stats || !activity)
    return <p>Loading...</p>;

  return (
    <div className="space-y-8">

      <DashboardStats
        data={stats}
      />

      <RecentActivity
        activity={activity}
      />

    </div>
  );
}