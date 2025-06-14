"use client";

import MenuForm from "@/components/admin/menu-form";
import { useMenu } from "@/services/menus/queries/use-menus";
import { useUpdateMenu } from "@/services/menus/mutations/use-update-menu";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Menu } from "@/services/menus/types";

export default function EditCakePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: cakeData } = useMenu(id);
  const { mutate: updateCake, isPending } = useUpdateMenu();

  const handleSubmit = (data: Menu) => {
    updateCake({ ...data, id }, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-800">Edit Cake</h1>
      <MenuForm
        initialData={cakeData?.data}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  );
}