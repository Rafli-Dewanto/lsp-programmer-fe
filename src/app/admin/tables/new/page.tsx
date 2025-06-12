"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTable } from '@/services/tables/mutations/use-create-table';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const AddNewTablePage = () => {
  const router = useRouter();
  const createTableMutation = useCreateTable();
  const [formData, setFormData] = React.useState({
    capacity: 0,
    table_number: 0,
  });

  const handleCreateTable = () => {
    if (!formData.table_number) {
      toast.success("Table number is required");
      return;
    }

    createTableMutation.mutate(
      { capacity: formData.capacity, table_number: formData.table_number },
      {
        onSuccess: () => {
          setFormData({
            capacity: 0,
            table_number: 0,
          });
          toast.success("Table created successfully");
        },
        onError: () => {
          toast.error("Failed to create table");
        },
      }
    );
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleCreateTable();
  }

  return (
    <div className="p-8 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Table</h1>
      <p className="text-gray-600">Add a new Table</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="table-number" className="block text-sm font-medium text-gray-700">
            Table Number
          </label>
          <Input
            id="table-number"
            type="text"
            value={formData.table_number}
            onChange={(e) => setFormData({ ...formData, table_number: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/tables")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={createTableMutation.isPending}
          >
            {createTableMutation.isPending ? "Creating..." : "Create Table"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddNewTablePage