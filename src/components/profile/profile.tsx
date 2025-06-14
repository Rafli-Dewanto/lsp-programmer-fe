"use client";

import { useUpdateCustomer } from '@/services/customers/mutations/use-update-customer';
import { UpdateCustomerPayload } from '@/services/customers/types';
import { useRouter } from 'next/navigation';
import ProfileForm from './profile-form';
import { useCustomer } from '@/services/customers/queries/use-customer';
import { toast } from 'sonner';

const Profile = () => {
  const updateCustomerMutation = useUpdateCustomer();
  const router = useRouter();
  const { data: customer } = useCustomer();

  const handleSubmit = (data: UpdateCustomerPayload) => {
    if (customer && customer?.data) {
      updateCustomerMutation.mutate({
        id: customer?.data?.id,
        payload: data
      }, {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          router.refresh();
        },
      });
      return;
    } else {
      toast.error("Please login to update your profile");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
      return;
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <ProfileForm onSubmit={handleSubmit} isLoading={updateCustomerMutation.isPending} initialData={customer?.data} />
    </div>
  )
}

export default Profile