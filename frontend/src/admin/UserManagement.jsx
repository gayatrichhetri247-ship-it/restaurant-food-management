import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/auth.service";

const UserManagement = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Interactive States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [deleteUserId, setDeleteUserId] = useState(null); // Tracks user targeted for deletion

  // Memoized filter and sort logic to keep it snappy
  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];

    return data.users
      .filter((user) => {
        const matchesSearch =
          user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole =
          roleFilter === "all" ||
          user.role?.toLowerCase() === roleFilter.toLowerCase();

        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const nameA = a.fullname || "";
        const nameB = b.fullname || "";
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
  }, [data?.users, searchTerm, roleFilter, sortOrder]);

  // Mock Handle Delete (Replace with your actual TanStack Mutation)
  const handleDelete = (id) => {
    console.log(`Deleting user with ID: ${id}`);
    // invoke your mutation here...
    setDeleteUserId(null);
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <span className="text-lg font-medium text-gray-600">Loading registered users...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
        <p className="font-semibold text-lg">Something went wrong.</p>
        <p className="text-sm text-red-500 mt-1 mb-4">Could not fetch the system user registry database.</p>
        <button 
          onClick={() => refetch()} 
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium border border-red-200 hover:bg-red-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review system accounts, manage authorization levels, and view registration dates.
          </p>
        </div>
        <div className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-center">
          Total Users: {filteredUsers.length}
        </div>
      </div>

      {/* Interactive Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            <span>Name</span>
            <span className="text-xs font-bold text-emerald-600">
              {sortOrder === "asc" ? "↑ A-Z" : "↓ Z-A"}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Email Address</th>
              <th scope="col" className="px-6 py-4">Account Role</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isAdmin = user.role?.toLowerCase() === "admin";

                return (
                  <tr key={user._id} className="hover:bg-emerald-50/20 transition-colors group">
                    {/* Fullname + Initial Avatar */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-inner transition-transform group-hover:scale-105 ${
                          isAdmin ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {user.fullname}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* Dynamic Role Badge */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide border shadow-sm ${
                          isAdmin
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Contextual Actions column */}
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      {deleteUserId === user._id ? (
                        <div className="flex items-center justify-end gap-2 animate-fadeIn">
                          <span className="text-xs text-red-500 font-normal mr-1">Confirm?</span>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors shadow-sm"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteUserId(null)}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors border border-gray-200"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteUserId(user._id)}
                          className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 focus:opacity-100 px-2 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete account"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-400 font-medium">
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;