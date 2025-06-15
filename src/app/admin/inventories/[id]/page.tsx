"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateInventory } from "@/services/inventories/mutations/use-update-inventory";
import { useInventory } from "@/services/inventories/queries/use-inventories";
import { getErrorMessage } from "@/utils/error";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UpdateInventoryPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: inventoryData, isLoading, error } = useInventory(id);
  const updateInventoryMutation = useUpdateInventory();

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "",
    minimum_stock: 0,
    reorder_point: 0,
    unit_price: 0,
  });

  useEffect(() => {
    if (inventoryData && !isLoading) {
      const inventory = inventoryData.data;
      setFormData({
        name: inventory?.name || "",
        quantity: inventory?.quantity || 0,
        unit: inventory?.unit || "",
        minimum_stock: inventory?.minimum_stock || 0,
        reorder_point: inventory?.reorder_point || 0,
        unit_price: inventory?.unit_price || 0,
      });
    }
  }, [inventoryData, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInventoryMutation.mutateAsync({
        ...formData,
        id,
      });
      router.push("/admin/inventories");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <p className="text-red-600 mb-4">Error loading inventory data</p>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/inventories")}
        >
          Back to Inventories
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Inventory</h1>
      <p className="text-gray-600">Update inventory information</p>

      {isLoading && (
        <p className="text-yellow-800 text-sm mt-4">Loading inventory data...</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <Input
            id="quantity"
            type="number"
            value={Number(formData.quantity)}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Unit
          </label>
          <Input
            id="unit"
            type="text"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            required
          />
        </div>

        <div>
          <label
            htmlFor="minimum_stock"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Stock
          </label>
          <Input
            id="minimum_stock"
            type="number"
            value={formData.minimum_stock}
            onChange={(e) =>
              setFormData({ ...formData, minimum_stock: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="reorder_point"
            className="block text-sm font-medium text-gray-700"
          >
            Reorder Point
          </label>
          <Input
            id="reorder_point"
            type="number"
            value={formData.reorder_point}
            onChange={(e) =>
              setFormData({ ...formData, reorder_point: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="unit_price"
            className="block text-sm font-medium text-gray-700"
          >
            Unit Price
          </label>
          <Input
            id="unit_price"
            type="number"
            value={formData.unit_price}
            onChange={(e) =>
              setFormData({ ...formData, unit_price: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/inventories")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={updateInventoryMutation.isPending || isLoading}
          >
            {updateInventoryMutation.isPending ? "Updating..." : "Update Inventory"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInventoryPage;