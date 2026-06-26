import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/auth.service";

const UserManagement = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading registered users...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        <p className="font-semibold">Something went wrong.</p>
        <p className="text-sm text-red-500 mt-1">Could not fetch the system user registry database.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review system accounts, manage authorization levels, and view registration dates.
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Email Address</th>
              <th scope="col" className="px-6 py-4">Account Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.users?.map((user) => {
              const isAdmin = user.role?.toLowerCase() === "admin";

              return (
                <tr key={user._id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Fullname + Initial Avatar */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                        isAdmin ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="font-semibold text-gray-900">{user.fullname}</div>
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
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;