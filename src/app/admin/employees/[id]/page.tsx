"use client"

import Show from "@/components/shared/show"
import { roles, type EMPLOYEE_ROLES } from "@/constants"
import { useUpdateEmployee } from "@/services/employees/mutations/use-update-employee"
import { useEmployee } from "@/services/employees/queries/use-employees"
import { Employee } from "@/services/employees/types"
import { Briefcase, Loader2, Mail, MapPin, User } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const UpdateEmployeePage = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { data: employeeData, isLoading, error } = useEmployee(id)
  const updateEmployeeMutation = useUpdateEmployee()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "admin" as EMPLOYEE_ROLES,
  })

  useEffect(() => {
    if (employeeData && !isLoading) {
      const employee = employeeData.data as Employee;
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        address: employee.address || "",
        role: (employee.role?.toLowerCase() as EMPLOYEE_ROLES) || "admin",
      })
    }
  }, [employeeData, id, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateEmployeeMutation.mutateAsync({
        id: id,
        ...formData,
      })
      router.push("/admin/employees")
    } catch (error) {
      toast.error("Failed to update employee: " + error)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-pink-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading employee data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading employee data</p>
              <button
                onClick={() => router.push("/admin/employees")}
                className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors duration-200"
              >
                Back to Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Employee</h1>
          <p className="text-gray-600">Update employee information</p>
          <Show when={isLoading}>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">Loading employee data...</p>
            </div>
          </Show>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter email address"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter address"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as EMPLOYEE_ROLES })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                disabled={isLoading}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/employees")}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateEmployeeMutation.isPending || isLoading}
                className="flex-1 px-4 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updateEmployeeMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Employee"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployeePage