"use client";

import CakeForm from "@/components/admin/cake-form";
import { useCreateCake } from "@/services/cakes/mutations/use-create-cake";
import { Cake } from "@/services/cakes/types";
import { useRouter } from "next/navigation";

export default function CreateCakePage() {
  const router = useRouter();
  const { mutate: createCake, isPending } = useCreateCake();

  const handleSubmit = (data: Cake) => {
    createCake(data, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-800">Create New Cake</h1>
      <CakeForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}