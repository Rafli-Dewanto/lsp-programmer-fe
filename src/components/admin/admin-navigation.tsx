"use client"

import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import Show from "../shared/show"
import { Edit, ShoppingBag, ChartSpline, PersonStanding, PackageOpen, ConciergeBell, CalendarClock } from "lucide-react"

const route = [
  { name: "Manage Products", href: "/admin", icon: Edit, role: ["admin"] },
  { name: "Customer Orders", href: "/admin/orders", icon: ShoppingBag, role: ["admin", "kitchen_staff", "waitress", "cashier"] },
  { name: "Sales", href: "/admin/sales", icon: ChartSpline, role: ["admin", "cashier"] },
  { name: "Employees", href: "/admin/employees", icon: PersonStanding, role: ["admin"] },
  { name: "Inventories", href: "/admin/inventories", icon: PackageOpen, role: ["admin", "kitchen_staff"] },
  { name: "Tables", href: "/admin/tables", icon: ConciergeBell, role: ["admin", "waitress", "cashier"] },
  { name: "Reservations", href: "/admin/reservations", icon: CalendarClock, role: ["admin", "kitchen_staff", "cashier"] },
]

const AdminNavigation = () => {
  const { role, isLoading } = useAuth()
  const router = useRouter()
  console.log(role)


  useEffect(() => {
    if (isLoading) return
    if (!["admin", "kitchen_staff", "waitress", "cashier"].includes(role as string)) {
      router.push("/auth/login")
    }
  }, [role, router, isLoading])

  if (isLoading) return null

  if (!["admin", "kitchen_staff", "waitress", "cashier"].includes(role as string)) return null

  return (
    <div className="w-full max-w-[250px] p-2.5 space-y-2 overflow-y-scroll">
      {route.map((item) => (
        <React.Fragment key={item.name}>
          <Show when={item.role.includes(role as string)}>
            <Link
              className="flex items-center cursor-pointer gap-2.5 w-full px-3 py-2 text-gray-700 hover:text-pink-700 bg-white hover:bg-pink-50 rounded-md transition-colors duration-150 group"
              href={item.href}
            >
              <div className="flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-md group-hover:bg-pink-200 transition-colors duration-150">
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          </Show>
        </React.Fragment>
      ))}
    </div>
  )
}

export default AdminNavigation
