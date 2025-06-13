"use client"

import { useReservations } from "@/services/reservations/queries/use-reservations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, UsersIcon, ClockIcon, InfoIcon, PencilIcon, Trash2, UserIcon, MailIcon } from "lucide-react" // Added InfoIcon for notes
import { formatDate } from "@/utils/string"
import Link from "next/link"
import { Button } from "../ui/button"
import { useDeleteReservation } from "@/services/reservations/mutations/use-delete-reservation"
import useDisclosure from "@/hooks/use-disclosure"
import { useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

const ManageReservations = () => {
  const { data: reservations, isLoading } = useReservations(true)
  const deleteReservation = useDeleteReservation();
  const { close, isOpen, open } = useDisclosure();
  const [reservationId, setReservationId] = useState<string | null>(null);

  // Function to determine badge color based on status
  const getStatusBadge = (status: string) => {
    // Enhanced status map for more distinct and accessible colors
    const statusMap: Record<string, { className: string; label: string }> = {
      confirmed: { className: "text-green-800 bg-green-200 hover:bg-green-300", label: "Confirmed" },
      pending: { className: "text-yellow-800 bg-yellow-200 hover:bg-yellow-300", label: "Pending" },
      cancelled: { className: "text-red-800 bg-red-200 hover:bg-red-300", label: "Cancelled" },
      completed: { className: "text-blue-800 bg-blue-200 hover:bg-blue-300", label: "Completed" },
      'no-show': { className: "bg-gray-500 hover:bg-gray-600", label: "No Show" },
    }

    const defaultStatus = { className: "bg-gray-500 hover:bg-gray-600", label: "Unknown" };
    return statusMap[status.toLowerCase()] || defaultStatus;
  }

  const formatReservationDate = (date: string) => {
    return formatDate(date, "en-US")
  }

  const formatReservationTime = (time: string) => {
    // Assuming time is in "HH:MM:SS" format, we just need "HH:MM"
    const parts = time.split("T")[1];
    if (parts) {
      return parts.slice(0, 5);
    }
    return "N/A"; // Fallback for malformed time string
  }

  const handleDeleteReservation = () => {
    if (!reservationId) {
      toast.error("Please select a reservation to delete.");
      return;
    }
    deleteReservation.mutate(parseInt(reservationId), {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        close();
        setReservationId(null);
      }
    });
  };

  return (
    <section>
      <Card className="border border-pink-200 shadow-lg rounded-xl overflow-hidden !pt-0">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-white border-b border-pink-200 p-6">
          <CardTitle className="text-3xl font-extrabold text-pink-800 tracking-tight">Manage Reservations</CardTitle>
          <CardDescription className="text-pink-600 text-lg">
            Manage customer&apos;s reservations here.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-14 w-14 rounded-full bg-pink-100" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-[300px] bg-pink-100" />
                    <Skeleton className="h-4 w-[250px] bg-pink-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : !reservations || reservations?.data?.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center justify-center">
              <CalendarIcon className="h-16 w-16 text-pink-400 mb-4" />
              <p className="text-gray-600 text-xl font-semibold mb-2">No Reservations Yet!</p>
              <p className="text-gray-500 max-w-sm">It looks like you don&apos;t have any reservations scheduled at the moment. Time to create one!</p>
              {/* Optional: Add a button to create a new reservation here */}
              {/* <Button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white">Create New Reservation</Button> */}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-pink-100">
                <TableHeader>
                  <TableRow className="bg-pink-100 hover:bg-pink-100">
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Customer</TableHead>
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Date & Time</TableHead>
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Party Size</TableHead>
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Status</TableHead>
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Notes</TableHead>
                    <TableHead className="font-semibold text-pink-800 py-4 px-6 text-left text-sm uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-pink-50">
                  {reservations?.data?.map((reservation) => (
                    <TableRow key={reservation.id} className="bg-white hover:bg-pink-50 transition-colors duration-200 ease-in-out">
                      <TableCell className="py-4 px-6 text-gray-700 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-pink-500" aria-hidden="true" />
                            <p className="font-medium text-gray-800">{reservation.customer.name}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MailIcon className="h-4 w-4 text-pink-400" aria-hidden="true" />
                            <p>{reservation.customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-pink-600" aria-hidden="true" />
                          <span className="sr-only">Reservation Date:</span>{formatReservationDate(reservation.reserve_date.toString())}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <ClockIcon className="h-4 w-4 text-pink-600" aria-hidden="true" />
                          <span className="sr-only">Reservation Time:</span>{formatReservationTime(reservation.reserve_date.toString())}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4 text-pink-600" aria-hidden="true" />
                          <span className="sr-only">Party Size:</span>{reservation.guest_count} people
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 whitespace-nowrap">
                        <Badge
                          className={`${getStatusBadge(reservation.status).className} font-semibold px-3 py-1.5 rounded-full text-xs transition-colors duration-200`}
                          role="status"
                        >
                          {getStatusBadge(reservation.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-6 max-w-xs text-gray-600 truncate">
                        <div className="flex items-center gap-2">
                          {reservation.special_notes ? (
                            <>
                              <InfoIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                              <span className="sr-only">Special Notes:</span>
                              <span title={reservation.special_notes}>{reservation.special_notes}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">- No notes -</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center justify-start gap-2 flex-row text-center gap-x-8">
                          <Link href={`/admin/reservations/${reservation.id}`}>
                            <PencilIcon className="h-4 w-4 text-blue-400" aria-hidden="true" />
                          </Link>
                          <button
                            onClick={() => {
                              setReservationId(reservation.id.toString());
                              open();
                            }}
                            className="text-pink-600 hover:text-pink-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-pink-600" aria-hidden="true" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* delete reservation modal */}
      <Dialog open={isOpen} onOpenChange={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this reservation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => {
              setReservationId(null);
              close();
            }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReservation} disabled={deleteReservation.isPending}>
              {deleteReservation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ManageReservations