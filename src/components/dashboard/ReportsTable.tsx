"use client";

import {
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  CheckCircle,
  Trash2,
  Search,
} from "lucide-react";

import {
  resolveReport,
  deleteReport,
} from "@/services/admin.service";

export default function ReportsTable({
  reports,
  reload,
}: any) {
  const [search, setSearch] =
    useState("");

  const filtered =
    useMemo(() => {
      return reports.filter(
        (r: any) =>
          r.bookTitle
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          r.reportedBy
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          r.ownerEmail
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [reports, search]);

  const handleResolve =
    async (id: string) => {
      await resolveReport(id);

      toast.success(
        "Resolved"
      );

      reload();
    };

  const handleDelete =
    async (id: string) => {
      if (
        !confirm(
          "Delete report?"
        )
      )
        return;

      await deleteReport(id);

      toast.success(
        "Deleted"
      );

      reload();
    };

return (
  <section className="rounded-3xl bg-[#C3955B] p-4 shadow-xl md:p-6">

 
    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <span className="rounded-full bg-[#261311] px-4 py-1 text-xs font-semibold tracking-wider text-[#C3955B]">
          REPORT MANAGEMENT
        </span>

        <h2 className="mt-3 text-3xl font-bold text-[#261311]">
          Reported Books
        </h2>

        <p className="mt-2 text-[#261311]/70">
          Review reports submitted by readers and take action.
        </p>
      </div>

      <div className="relative w-full lg:w-80">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C3955B]"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reports..."
          className="w-full rounded-2xl border border-[#261311]/20 bg-[#261311] py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-[#C3955B]"
        />

      </div>

    </div>


    <div className="hidden overflow-hidden rounded-3xl border border-[#261311]/20 shadow-xl lg:block">

      <div className="overflow-x-auto bg-[#261311]">

        <table className="min-w-full">

          <thead className="bg-[#1E0E0B] text-[#C3955B]">

            <tr>

              <th className="p-5 text-left">Book</th>

              <th className="p-5 text-left">Reporter</th>

              <th className="p-5 text-left">Owner</th>

              <th className="p-5 text-left">Reason</th>

              <th className="p-5 text-center">Status</th>

              <th className="p-5 text-center">Date</th>

              <th className="p-5 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((report: any) => (

              <tr
                key={report._id}
                className="border-t border-[#C3955B]/10 transition hover:bg-[#3A241C]"
              >

                <td className="p-5 font-semibold text-white">
                  {report.bookTitle}
                </td>

                <td className="p-5 text-gray-300">
                  {report.reportedBy}
                </td>

                <td className="p-5 text-gray-300">
                  {report.ownerEmail}
                </td>

                <td className="max-w-sm p-5 text-gray-400">
                  {report.reason}
                </td>

                <td className="p-5 text-center">

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${
                      report.status === "resolved"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {report.status}
                  </span>

                </td>

                <td className="p-5 text-center text-gray-400">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>

                <td className="p-5">

                  <div className="flex justify-center gap-3">

                    {report.status !== "resolved" && (

                      <button
                        onClick={() => handleResolve(report._id)}
                        className="rounded-xl bg-[#C3955B] p-3 text-[#261311] transition hover:scale-105 hover:bg-[#d4a363]"
                      >
                        <CheckCircle size={18} />
                      </button>

                    )}

                    <button
                      onClick={() => handleDelete(report._id)}
                      className="rounded-xl bg-red-600 p-3 text-white transition hover:scale-105 hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>



    <div className="space-y-5 lg:hidden">

      {filtered.map((report: any) => (

        <div
          key={report._id}
          className="rounded-3xl bg-[#261311] p-5 shadow-xl"
        >

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-lg font-bold text-white">
                {report.bookTitle}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                report.status === "resolved"
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {report.status}
            </span>

          </div>

          <div className="mt-5 space-y-3 text-sm">

            <p className="text-gray-300">
              <span className="font-semibold text-[#C3955B]">
                Reporter:
              </span>{" "}
              {report.reportedBy}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-[#C3955B]">
                Owner:
              </span>{" "}
              {report.ownerEmail}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-[#C3955B]">
                Reason:
              </span>{" "}
              {report.reason}
            </p>

          </div>

          <div className="mt-6 flex gap-3">

            {report.status !== "resolved" && (

              <button
                onClick={() => handleResolve(report._id)}
                className="flex-1 rounded-xl bg-[#C3955B] py-3 font-semibold text-[#261311] transition hover:bg-[#d4a363]"
              >
                Resolve
              </button>

            )}

            <button
              onClick={() => handleDelete(report._id)}
              className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </section>
);
}