"use client"

import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Show from "../shared/show"
import { Edit, ShoppingBag, ChartSpline, PersonStanding } from "lucide-react"

const AdminNavigation = () => {
  const { role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (role !== "admin") {
      router.push("/auth/login")
    }
  }, [role, router])

  if (role !== "admin") return null

  return (
    <Show when={role === "admin"}>
      <div className="w-full max-w-[250px] p-2.5 space-y-2">
        <div className="text-sm font-medium text-gray-500 px-2 mb-1">Admin Controls</div>

        <Link
          className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
          href="/admin"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
            <Edit className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">Manage Products</span>
        </Link>

        <Link
          className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
          href="/admin/orders"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">Customer Orders</span>
        </Link>

        <Link
          className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
          href="/admin/sales"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
            <ChartSpline className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">Sales</span>
        </Link>

        <Link
          className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
          href="/admin/employees"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
            <PersonStanding className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">Employees</span>
        </Link>
      </div>
    </Show>
  )
}

export default AdminNavigation
