"use client"

import { useDeleteEmployee } from "@/services/employees/mutations/use-delete-employee"
import { useEmployees } from "@/services/employees/queries/use-employees"
import { Edit2, Filter, Plus, Search, Trash2, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const EmployeesManagement = () => {
  const { data: employees, isLoading } = useEmployees();
  const deleteEmployeeMutation = useDeleteEmployee();

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const roles = [
    { value: "admin", label: "Admin", color: "bg-pink-100 text-pink-800" },
    { value: "kitchen_staff", label: "Kitchen Staff", color: "bg-orange-100 text-orange-800" },
    { value: "waitress", label: "Waitress", color: "bg-blue-100 text-blue-800" },
    { value: "cashier", label: "Cashier", color: "bg-green-100 text-green-800" },
  ]

  const filteredEmployees = employees?.data?.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || emp.role === filterRole
    return matchesSearch && matchesRole
  });

  const getRoleInfo = (role: string) => roles.find((r) => r.value === role) || roles[0]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Employee Management</h1>
              <p className="text-gray-600">Manage your restaurant staff efficiently</p>
            </div>
            <Link href="/admin/employees/new">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Employee
              </button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Employees ({filteredEmployees?.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Address</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees?.map((employee) => {
                  const roleInfo = getRoleInfo(employee.role)
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{employee.address}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/employees/${employee.id}`}>
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Edit employee"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              confirm("Are you sure you want to delete this employee?")
                              deleteEmployeeMutation.mutate(employee.id.toString())
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="Delete employee"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filteredEmployees?.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm || filterRole !== "all"
                    ? "No employees match your search criteria"
                    : "No employees found"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeesManagement
