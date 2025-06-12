"use client"

import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Show from "../shared/show"
import { Edit, ShoppingBag, ChartSpline, PersonStanding, PackageOpen, ConciergeBell } from "lucide-react"

const route = [
  { name: "Manage Products", href: "/admin", icon: Edit },
  { name: "Customer Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Sales", href: "/admin/sales", icon: ChartSpline },
  { name: "Employees", href: "/admin/employees", icon: PersonStanding },
  { name: "Inventories", href: "/admin/inventories", icon: PackageOpen },
  { name: "Tables", href: "/admin/tables", icon: ConciergeBell },
]

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
        {route.map((item) => (
          <Link
            key={item.name}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
            href={item.href}
          >
            <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
              <item.icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </Show>
  )
}

export default AdminNavigation
