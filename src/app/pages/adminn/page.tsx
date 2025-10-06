/*
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
*/






"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Settings,
  FileBarChart,
  LogOut,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react";

// Types
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

type Role = {
  id: number;
  name: string;
  permissions: string;
};

export default function Admin() {
  const adminName = "Admin John"; // Example, replace with real admin name from login
  const [activeView, setActiveView] = useState<
    "home" | "users" | "roles" | "reports" | "settings"
  >("home");

  // Sample Data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Teacher", status: "Active" },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Admin", permissions: "All" },
    { id: 2, name: "Teacher", permissions: "Manage Books, View Reports" },
  ]);

  // Form state
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Student" });
  const [newRole, setNewRole] = useState({ name: "", permissions: "" });

  // CRUD Functions
  const addUser = () => {
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser, status: "Pending" }]);
    setNewUser({ name: "", email: "", role: "Student" });
  };
  const updateUser = (id: number, updatedData: Partial<User>) => {
    setUsers(users.map(u => (u.id === id ? { ...u, ...updatedData } : u)));
  };
  const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));

  const addRole = () => {
    const id = roles.length + 1;
    setRoles([...roles, { id, ...newRole }]);
    setNewRole({ name: "", permissions: "" });
  };
  const deleteRole = (id: number) => setRoles(roles.filter(r => r.id !== id));

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-indigo-400 text-white flex flex-col">
        <div className="p-6 text-3xl font-bold border-b border-white/30">📚 LibraryMS</div>
        <nav className="flex-1 p-4 space-y-4 font-semibold text-lg">
          {["home", "users", "roles", "reports", "settings"].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view as any)}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition hover:bg-white/20 ${
                activeView === view ? "bg-white/20" : ""
              }`}
            >
              {{
                home: <FileBarChart className="w-5 h-5" />,
                users: <Users className="w-5 h-5" />,
                roles: <Shield className="w-5 h-5" />,
                reports: <FileBarChart className="w-5 h-5" />,
                settings: <Settings className="w-5 h-5" />,
              }[view]}
              <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20">
          <Link href="/" className="">
          <button className="flex items-center space-x-3 w-full p-2 rounded-lg transition hover:bg-red-600">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto text-gray-600">
        {/* Personalized Welcome */}
        {activeView === "home" && (
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome, {adminName} 👋</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Here’s a quick overview of your library system status.
            </p>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold">👥 Total Users</h3>
                <p className="text-2xl font-bold text-blue-700 mt-2">{users.length}</p>
              </div>
            
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold">🛡 Total Roles</h3>
                <p className="text-2xl font-bold text-purple-700 mt-2">{roles.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold">📝 Pending Users</h3>
                <p className="text-2xl font-bold text-red-700 mt-2">
                  {users.filter(u => u.status === "Pending").length}
                </p>
              </div>
            </div>

            {/* Recent User Requests */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Recent Pending Requests</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u => u.status === "Pending")
                    .map(u => (
                      <tr key={u.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{u.name}</td>
                        <td className="p-3">{u.role}</td>
                        <td className="p-3 text-yellow-600">{u.status}</td>
                        <td className="p-3 space-x-2">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                            onClick={() => updateUser(u.id, { status: "Active" })}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                            onClick={() => deleteUser(u.id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users CRUD */}
        {activeView === "users" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">👥 Manage Users</h2>
            {/* Add User */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="font-semibold text-lg mb-3">Add New User</h3>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="px-3 py-2 border rounded-lg outline-none flex-1"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="px-3 py-2 border rounded-lg outline-none flex-1"
                />
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="px-3 py-2 border rounded-lg outline-none"
                >
                  <option value="Librarian">Librarian</option>
                  <option value="Admin">Admin</option>
                </select>
                <button
                  onClick={addUser}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <PlusCircle className="inline w-5 h-5 mr-1" /> Add
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">All Users</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3">{u.status}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() =>
                            updateUser(u.id, { status: u.status === "Active" ? "Pending" : "Active" })
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                        >
                          <Edit className="inline w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="inline w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles CRUD */}
        {activeView === "roles" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">🛡 Manage Roles</h2>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="font-semibold text-lg mb-3">Add New Role</h3>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Role Name"
                  value={newRole.name}
                  onChange={e => setNewRole({ ...newRole, name: e.target.value })}
                  className="px-3 py-2 border rounded-lg outline-none flex-1"
                />
                <input
                  type="text"
                  placeholder="Permissions"
                  value={newRole.permissions}
                  onChange={e => setNewRole({ ...newRole, permissions: e.target.value })}
                  className="px-3 py-2 border rounded-lg outline-none flex-1"
                />
                <button
                  onClick={addRole}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <PlusCircle className="inline w-5 h-5 mr-1" /> Add
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">All Roles</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="p-3">Name</th>
                    <th className="p-3">Permissions</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(r => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{r.name}</td>
                      <td className="p-3">{r.permissions}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => deleteRole(r.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="inline w-4 h-4 mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports and Settings placeholders */}
        {activeView === "reports" && <p className="text-gray-600">Reports Section (coming soon)</p>}
        {activeView === "settings" && <p className="text-gray-600">Settings Section (coming soon)</p>}
      </main>
    </div>
  );
}
