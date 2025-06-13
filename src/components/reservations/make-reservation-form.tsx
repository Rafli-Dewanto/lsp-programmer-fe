"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCreateReservation } from "@/services/reservations/mutations/use-create-reservation"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

const MakeReservationForm = () => {
  const router = useRouter();
  const makeReservationMutation = useCreateReservation()
  const [formData, setFormData] = useState({
    guest_count: 2,
    reserve_date: new Date().toISOString().slice(0, 16),
    special_notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    makeReservationMutation.mutate({
      ...formData,
      guest_count: Number(formData.guest_count),
      reserve_date: new Date(formData.reserve_date),
    }, {
      onSuccess: () => {
        router.push("/reservations")
      },
      onError: () => {
        toast.error("Something went wrong, please try again.")
      }
    })
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">Make a Reservation</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="guest_count" className="block text-sm font-medium text-gray-700 mb-2">Guest Count</Label>
          <Input
            type="number"
            name="guest_count"
            value={formData.guest_count}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200"
            required
          />
        </div>

        <div>
          <Label htmlFor="reserve_date" className="block text-sm font-medium text-gray-700 mb-2">Reservation Date & Time</Label>
          <Input
            type="datetime-local"
            name="reserve_date"
            value={formData.reserve_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200"
            required
          />
        </div>

        <div>
          <Label htmlFor="special_notes" className="block text-sm font-medium text-gray-700 mb-2">Special Notes</Label>
          <Textarea
            name="special_notes"
            value={formData.special_notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 min-h-[100px]"
            placeholder="e.g., Anniversary celebration, high chair needed, dietary restrictions..."
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          disabled={makeReservationMutation.isPending}
        >
          {makeReservationMutation.isPending ? "Submitting..." : "Confirm Reservation"}
        </Button>
      </form>
    </div>
  )
}

export default MakeReservationForm