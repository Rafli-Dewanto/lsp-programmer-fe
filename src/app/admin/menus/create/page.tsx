"use client";

import MenuForm from "@/components/admin/menu-form";
import { useCreateMenu } from "@/services/menus/mutations/use-create-menu";
import { Menu } from "@/services/menus/types";
import { useRouter } from "next/navigation";

export default function CreateCakePage() {
  const router = useRouter();
  const { mutate: createCake, isPending } = useCreateMenu();

  const handleSubmit = (data: Menu) => {
    createCake(data, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-800">Create New Cake</h1>
      <MenuForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}