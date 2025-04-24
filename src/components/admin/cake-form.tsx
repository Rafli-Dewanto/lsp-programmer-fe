"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Cake, cakeCategory } from "@/services/cakes/types";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Show from "../shared/show";

type CakeFormProps = {
  initialData?: Partial<Cake>;
  onSubmit: (data: Cake) => void;
  isLoading?: boolean;
};

const CakeForm = (props: CakeFormProps) => {
  const { initialData, onSubmit, isLoading } = props;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<Partial<Cake>>({
    defaultValues: initialData,
  });

  const categories: cakeCategory[] = [
    "wedding_cake",
    "birthday_cake",
    "cup_cake",
    "seasonal_cake",
    "other",
  ];

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit((data) => onSubmit(data as Cake))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter cake title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Enter cake description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be greater than 0" },
              })}
              placeholder="Enter cake price"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Show when={!!errors.category}>
              <p className="text-sm text-red-500">{errors?.category?.message}</p>
            </Show>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              {...register("image", { required: "Image URL is required" })}
              placeholder="Enter cake image URL"
            />
            <Show when={!!errors.image}>
              <p className="text-sm text-red-500">{errors.image?.message}</p>
            </Show>
          </div>

          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Cake"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CakeForm;