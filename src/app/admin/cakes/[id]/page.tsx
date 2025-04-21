"use client";

import CakeForm from "@/components/admin/cake-form";
import { useCake } from "@/services/cakes/queries/use-cakes";
import { useUpdateCake } from "@/services/cakes/mutations/use-update-cake";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Cake } from "@/services/cakes/types";

export default function EditCakePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: cakeData } = useCake(id);
  const { mutate: updateCake, isPending } = useUpdateCake();

  const handleSubmit = (data: Cake) => {
    updateCake({ ...data, id }, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-pink-800">Edit Cake</h1>
      <CakeForm
        initialData={cakeData?.data}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  );
}