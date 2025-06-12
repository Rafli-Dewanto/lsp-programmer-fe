"use client";

import { useDeleteInventory } from "@/services/inventories/mutations/use-delete-inventory";
import { useInventories } from "@/services/inventories/queries/use-inventories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/utils/string";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import useDisclosure from "@/hooks/use-disclosure";
import { getErrorMessage } from "@/utils/error";
import { toast } from "sonner";

const InventoriesManagement = () => {
  const { data: inventories, isLoading } = useInventories();
  const deleteInventoryMutation = useDeleteInventory();
  const [searchQuery, setSearchQuery] = useState("");
  const { close, isOpen, open } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading inventories...</p>
      </div>
    );
  }

  const filteredInventories = inventories?.data?.filter((inv) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      inv.name.toLowerCase().includes(searchLower) ||
      inv.unit.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Management</h1>
        <div className="flex gap-4">
          <Link href="/admin/inventories/new">
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white"
              size="sm"
            >
              Add Inventory
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search inventories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Inventories ({filteredInventories?.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Unit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Min Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Reorder Point</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Unit Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventories?.map((inventory) => (
                <tr key={inventory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{inventory.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inventory.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inventory.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inventory.minimum_stock}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inventory.reorder_point}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(inventory.unit_price, "id-ID")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                      <Link href={`/admin/inventories/${inventory.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit inventory"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          setIdToDelete(inventory.id.toString());
                          open();
                        }}
                        title="Delete inventory"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInventories?.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500">
                {searchQuery
                  ? "No inventories match your search criteria"
                  : "No inventories found"}
              </p>
            </div>
          )}
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inventory? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => {
              setIdToDelete(null);
              close();
            }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              deleteInventoryMutation.mutate(idToDelete!, {
                onSuccess: () => {
                  setIdToDelete(null);
                  close();
                  toast.success("Inventory deleted successfully");
                },
                onError: (error) => {
                  toast.error(getErrorMessage(error));
                },
              });
            }} disabled={deleteInventoryMutation.isPending}>
              {deleteInventoryMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoriesManagement;