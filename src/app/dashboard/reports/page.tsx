"use client";

import {
  useEffect,
  useState,
} from "react";


import {
  getReports,
} from "@/services/admin.service";
import ReportsTable from "@/components/dashboard/ReportsTable";

export default function ReportsPage() {
  const [reports, setReports] =
    useState([]);

  const load = async () => {
    const res =
      await getReports();

    setReports(
      res.reports
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <ReportsTable
        reports={reports}
        reload={load}
      />

    </div>
  );
}