"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDisclosure from "@/hooks/use-disclosure";
import { useDeleteMenu } from "@/services/menus/mutations/use-delete-menu";
import { useMenus } from "@/services/menus/queries/use-menus";
import { menuCategory } from "@/services/menus/types";
import { getErrorMessage } from "@/utils/error";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import Link from "next/link";
import { formatCurrency } from "@/utils/string";

const ProductList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { close, isOpen, open } = useDisclosure();
  const deleteCakeMutation = useDeleteMenu();

  const page = Number(searchParams.get("page") || "1");
  const title = searchParams.get("title") || "";
  const category = searchParams.get("category") as menuCategory;

  const [searchTitle, setSearchTitle] = useState(title);
  const [searchCategory, setSearchCategory] = useState(category ?? "all");

  const { data, isLoading, error } = useMenus({
    page,
    title,
    category: category === "all" ? "" : category,
  });

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.set("title", searchTitle);
    if (searchCategory) params.set("category", searchCategory);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTitle("");
    setSearchCategory("all");
    router.push(pathname);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    open();
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteCakeMutation.mutate(Number(selectedId), {
        onSuccess: () => {
          close();
          setSelectedId(null);
        },
        onError: (error) => {
          alert(getErrorMessage(error));
        },
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/menus/${id}`);
  };

  const handleAddNew = () => {
    router.push(`/admin/products/create`);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Product Management</h1>
        <Link href="/admin/menus/create">
          <Button className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800" onClick={handleAddNew}>
            Add New Cake
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <Input
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="max-w-sm"
        />

        <Select
          value={searchCategory}
          onValueChange={(value) => setSearchCategory(value as menuCategory || "other")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="birthday_cake">Birthday</SelectItem>
            <SelectItem value="wedding_cake">Wedding</SelectItem>
            <SelectItem value="cup_cake">Cupcake</SelectItem>
            <SelectItem value="seasonal_cake">Seasonal</SelectItem>
            <SelectItem value="other">Others</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={updateFilters}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error loading products.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((cake) => (
              <TableRow key={cake.id}>
                <TableCell>{cake.title}</TableCell>
                <TableCell className="capitalize">{cake.category.split("_").join(" ")}</TableCell>
                <TableCell>{formatCurrency(cake.price, "id-ID")}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    size="sm"
                    onClick={() => handleEdit(cake.id.toString())}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cake.id.toString())}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="mt-6 flex justify-center items-center gap-4">
        {(data?.meta?.last_page || 0) > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (page > 1) handlePageChange(page - 1)
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: data?.meta?.last_page || 0 }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === data?.meta?.last_page ||
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(pageNum)
                        }}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }

                // Show ellipsis for gaps
                if (
                  (pageNum === 2 && page > 3) ||
                  (pageNum === (data?.meta?.last_page || 0) - 1 && page < (data?.meta?.last_page || 0) - 2)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return null
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (page < (data?.meta?.last_page || 0)) handlePageChange(page + 1)
                  }}
                  className={page >= (data?.meta?.last_page || 0) ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => close()}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteCakeMutation.isPending}>
              {deleteCakeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;