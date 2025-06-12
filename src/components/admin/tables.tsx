"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteTable } from "@/services/tables/mutations/use-delete-table";
import { useUpdateTable } from "@/services/tables/mutations/use-update-table";
import { useTables } from "@/services/tables/queries/use-tables";
import { Table } from "@/services/tables/types";
import { useState } from "react";
import { toast } from "sonner";
import Show from "../shared/show";
import Link from "next/link";

export default function Tables() {
  const { data: tables, isLoading } = useTables();
  const { mutate: updateTable } = useUpdateTable();
  const { mutate: deleteTable } = useDeleteTable();

  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const handleToggleAvailability = (table: Table) => {
    updateTable(
      { id: table.id, is_available: !table.is_available },
      {
        onSuccess: () => {
          toast.success(`Table ${table.table_number} ${!table.is_available ? "is now available" : "is now unavailable"}`);
        },
        onError: () => {
          toast.error("Failed to update table status");
        },
      }
    );
  };

  const handleDeleteTable = (id: number) => {
    deleteTable(id, {
      onSuccess: () => {
        toast.success("Table deleted successfully");
        setOpenDialogId(null); // Close dialog on success
      },
      onError: () => {
        toast.error("Failed to delete table");
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Table Management</h2>
      {/* add new table */}
      <div className="my-2.5">
        <Link href="/admin/tables/new">
          <Button className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800">
            Add New Table
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Show when={!!tables?.data}>
          {tables?.data?.sort((a, b) => a.table_number - b.table_number).map((table) => (
            <div
              key={table.id}
              onClick={() => handleToggleAvailability(table)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${table.is_available ? "bg-green-100 hover:bg-green-200" : "bg-red-100 hover:bg-red-200"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Table No. {table.table_number}</h3>
                  <p className="text-sm text-zinc-700">Capacity: {table.capacity}</p>
                  <p className={`text-sm ${table.is_available ? "text-green-600" : "text-red-600"}`}>
                    {table.is_available ? "Available" : "Unavailable"}
                  </p>
                </div>
                <Dialog open={openDialogId === table.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? table.id : null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Trash Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </DialogTrigger>
                  <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle>Delete Table</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete table {table.table_number}?</p>
                    <div className="flex justify-end gap-4 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteTable(table.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </Show>
        <Show when={!tables?.data}>
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground">No tables found</p>
          </div>
        </Show>
      </div>
    </div>
  );
}