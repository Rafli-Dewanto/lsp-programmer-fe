"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateReservation } from "@/services/reservations/mutations/use-update-reservation"
import { useReservation } from "@/services/reservations/queries/use-reservations"
import { Reservation } from "@/services/reservations/types"
import { ArrowLeft, Calendar, ClipboardList, Loader2, Users } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const statuses = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-800" },
]

const UpdateReservationPage = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { data: reservationData, isLoading, error } = useReservation(id)
  const updateReservationMutation = useUpdateReservation()

  // Initialize state with default values
  const [status, setStatus] = useState<string>("")
  const [guestCount, setGuestCount] = useState<number>(0)
  const [reserveDate, setReserveDate] = useState<Date>(new Date())
  const [specialNotes, setSpecialNotes] = useState<string>("")

  useEffect(() => {
    if (!reservationData?.data) return;

    const initialReservation = reservationData.data as Reservation;

    // Handle date
    const d = new Date(initialReservation.reserve_date);
    const validDate = !isNaN(d.getTime()) ? d : new Date();
    setReserveDate(validDate);

    // Handle status - this was the main issue
    const validStatus = statuses.find((s) => s.value === initialReservation.status)
      ? initialReservation.status
      : "pending";
    setStatus(validStatus);

    // Handle other fields
    setGuestCount(initialReservation.guest_count || 0);
    setSpecialNotes(initialReservation.special_notes || "");
  }, [reservationData]); // Changed dependency to just reservationData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const reserveDateWithOffset = reserveDate.toISOString().replace("Z", "+07:00");
    try {
      await updateReservationMutation.mutateAsync({
        guest_count: guestCount,
        reserve_date: reserveDateWithOffset,
        special_notes: specialNotes,
        status: status,
        id: Number.parseInt(id),
      })
      router.push("/admin/reservations")
    } catch (error) {
      toast.error("Failed to update reservation: " + error)
    }
  }

  const getStatusBadge = (status: string) => {
    const category = statuses.find((c) => c.value === status)
    return category ? <Badge className={category.color + " border-none"}>{category.label}</Badge> : null
  }

  const formatDateTimeLocal = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error Loading Reservation</CardTitle>
            <CardDescription className="text-red-600">
              There was a problem retrieving the reservation details.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/reservations")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reservations
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-pink-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading reservation data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/reservations")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Update Reservation</h1>
          <p className="text-gray-500 text-sm">Reservation #{id}</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reservation Details</CardTitle>
            {!isLoading && status && getStatusBadge(status)}
          </div>
          <CardDescription>Update the reservation information below</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ClipboardList className="h-4 w-4" /> Status
              </label>
              {status !== "" && (
                <Select value={status} onValueChange={(v) => setStatus(v.toString())}>
                  <SelectTrigger className="w-full">
                    <SelectValue aria-label={status} placeholder="Select reservation status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((statusOption) => (
                      <SelectItem key={statusOption.value} value={statusOption.value.toString()}>
                        <div className="flex items-center gap-2">
                          <Badge className={statusOption.color + " border-none"}>
                            {statusOption.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="guest_count" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Guest Count
                </label>
                <Input
                  id="guest_count"
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number.parseInt(e.target.value))}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reserve_date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Reservation Date & Time
                </label>
                <Input
                  id="reserve_date"
                  type="datetime-local"
                  value={formatDateTimeLocal(reserveDate)}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    if (!isNaN(newDate.getTime())) {
                      setReserveDate(newDate);
                    }
                  }}
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="special_notes" className="text-sm font-medium text-gray-700">
                Special Notes
              </label>
              <Textarea
                id="special_notes"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Enter any special requests or notes for this reservation"
                className="min-h-[100px] w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/20 p-6">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/reservations")}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white"
              disabled={updateReservationMutation.isPending}
            >
              {updateReservationMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Reservation"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default UpdateReservationPage