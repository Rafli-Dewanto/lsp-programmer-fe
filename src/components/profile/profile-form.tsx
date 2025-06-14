"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit2, Mail, MapPin, User, Save, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { CustomerResponse, UpdateCustomerPayload } from "@/services/customers/types"

type ProfileFormProps = {
  initialData?: Partial<CustomerResponse>
  onSubmit: (data: UpdateCustomerPayload) => void
  isLoading?: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const { initialData, onSubmit, isLoading } = props
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCustomerPayload>({
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        email: initialData.email || "",
        address: initialData.address || "",
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data: UpdateCustomerPayload) => {
    onSubmit(data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-pink-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-pink-100">
                  <AvatarImage src={"https://media.istockphoto.com/id/1439148414/vector/avatar-icon.jpg?s=170667a&w=0&k=20&c=QXwiXX7Y_UaclLHuf7vmFrzUO72s9Y-2npYdg66bOyc="} />
                  <AvatarFallback className="text-lg bg-pink-100 text-pink-700">
                    {initialData?.name ? getInitials(initialData.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-pink-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg text-gray-900">{initialData?.name || "User"}</h3>
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">Customer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="md:col-span-2 border-pink-100 shadow-sm !pt-0">
          <CardHeader className="bg-gradient-to-l from-pink-50 to-white p-4">
            <CardTitle className="flex items-center justify-between text-gray-900">
              Personal Information
              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit(handleFormSubmit)}
                    size="sm"
                    disabled={isLoading}
                    className="gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    <Save className="h-4 w-4" />
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    size="sm"
                    variant="outline"
                    className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 bg-white">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-pink-500" />
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
              </div>
              {isEditing ? (
                <div className="space-y-1">
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your full name"
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.name && <p className="text-sm text-pink-600">{errors.name.message}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-600 pl-6">{initialData?.name || "Not provided"}</p>
              )}
            </div>

            <Separator className="bg-pink-100" />

            {/* Email Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
              </div>
              {isEditing ? (
                <div className="space-y-1">
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email address"
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.email && <p className="text-sm text-pink-600">{errors.email.message}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-600 pl-6">{initialData?.email || "Not provided"}</p>
              )}
            </div>

            <Separator className="bg-pink-100" />

            {/* Address Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-pink-500" />
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address
                </Label>
              </div>
              {isEditing ? (
                <div className="space-y-1">
                  <Textarea
                    id="address"
                    {...register("address")}
                    placeholder="Enter your address"
                    className="min-h-[80px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  {errors.address && <p className="text-sm text-pink-600">{errors.address.message}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-600 pl-6 whitespace-pre-line">
                  {initialData?.address || "Not provided"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileForm
