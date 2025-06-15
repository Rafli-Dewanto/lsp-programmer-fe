"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateInventory } from "@/services/inventories/mutations/use-create-inventory";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreateInventoryPage = () => {
  const router = useRouter();
  const createInventoryMutation = useCreateInventory();

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "",
    minimum_stock: 0,
    reorder_point: 0,
    unit_price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInventoryMutation.mutateAsync(formData);
      router.push("/admin/inventories");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Inventory</h1>
      <p className="text-gray-600">Add a new inventory item</p>

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
            value={formData.quantity}
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
            disabled={createInventoryMutation.isPending}
          >
            {createInventoryMutation.isPending ? "Creating..." : "Create Inventory"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateInventoryPage;