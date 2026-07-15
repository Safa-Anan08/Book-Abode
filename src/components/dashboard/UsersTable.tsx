"use client";

import { useMemo, useState } from "react";
import { Trash2, Shield, Search } from "lucide-react";
import toast from "react-hot-toast";

import {
  updateRole,
  deleteUser,
} from "@/services/admin.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

interface Props {
  users: User[];
  reload: () => Promise<void>;
}

export default function UsersTable({
  users,
  reload,
}: Props) {
  const [loadingId, setLoadingId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleRole = async (
    id: string,
    role: "user" | "admin"
  ) => {
    try {
      setLoadingId(id);

      await updateRole(id, role);

      toast.success("Role updated");

      reload();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    } finally {
      setLoadingId("");
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const ok = window.confirm(
      "Delete this user?"
    );

    if (!ok) return;

    try {
      setLoadingId(id);

      await deleteUser(id);

      toast.success("User deleted");

      reload();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setLoadingId("");
    }
  };

 return (
  <section className="rounded-3xl bg-[#C3955B] p-4 shadow-xl md:p-6">


    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <span className="rounded-full bg-[#261311] px-4 py-1 text-xs font-semibold tracking-wider text-[#C3955B]">
          USERS
        </span>

        <h2 className="mt-3 text-3xl font-bold text-[#261311]">
          Manage Users
        </h2>

        <p className="mt-2 text-[#261311]/70">
          Search, manage roles and remove users.
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
          placeholder="Search users..."
          className="w-full rounded-2xl border border-[#261311]/20 bg-[#261311] py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none transition focus:border-[#C3955B]"
        />

      </div>

    </div>

  
    <div className="overflow-hidden rounded-3xl border border-[#261311]/10">

      <div className="overflow-x-auto">

        <table className="min-w-[900px] w-full">

          <thead className="bg-[#261311]">

            <tr className="text-[#C3955B]">

              <th className="px-6 py-4 text-left font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Joined
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-t border-[#261311]/10 bg-[#6a3522] transition hover:bg-[#4A2C22]"
              >

                <td className="px-6 py-5 font-semibold text-white">
                  {user.name}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {user.email}
                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-[#C3955B] text-[#261311]"
                        : "bg-green-800/20 text-white"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="px-6 py-5 text-center text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    <button
                      disabled={loadingId === user._id}
                      onClick={() =>
                        handleRole(
                          user._id,
                          user.role === "admin"
                            ? "user"
                            : "admin"
                        )
                      }
                      className="rounded-xl bg-[#C3955B] p-3 text-[#261311] transition hover:scale-105 hover:bg-[#d5a66a] disabled:opacity-50"
                    >
                      <Shield size={18} />
                    </button>

                    <button
                      disabled={loadingId === user._id}
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="rounded-xl bg-red-600 p-3 text-white transition hover:scale-105 hover:bg-red-700 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

            {filteredUsers.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="bg-[#3A241C] py-14 text-center text-gray-400"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </section>
);

}