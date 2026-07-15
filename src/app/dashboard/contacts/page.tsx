"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getContacts } from "@/services/admin.service";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await getContacts();

      if (res.success) {
        setContacts(res.contacts);
      }
    } catch {
      toast.error("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-lg font-semibold text-[#261311]">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#dfc787] p-6 shadow-xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#261311]">
          Contact Messages
        </h1>

        <p className="mt-1 text-gray-500">
          Total Messages: {contacts.length}
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center text-gray-500">
          No contact messages found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-2xl">
            <thead className="bg-[#261311] text-white">
              <tr>
                <th className="px-5 py-4 text-left">Name</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Subject</th>
                <th className="px-5 py-4 text-left">Date</th>
                <th className="px-5 py-4 text-left">Message</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b hover:bg-[#f8f3ec]"
                >
                  <td className="px-5 py-4 font-medium">
                    {contact.name}
                  </td>

                  <td className="px-5 py-4">
                    {contact.email}
                  </td>

                  <td className="px-5 py-4">
                    {contact.subject}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(
                      contact.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="max-w-sm px-5 py-4">
                    <p className="line-clamp-2">
                      {contact.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}