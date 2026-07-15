"use client";

import { useEffect, useState } from "react";

import { getUsers } from "@/services/admin.service";
import UsersTable from "@/components/dashboard/UsersTable";


export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();

    setUsers(res.users);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Manage Users
      </h1>

      <UsersTable
        users={users}
        reload={loadUsers}
      />
    </div>
  );
}