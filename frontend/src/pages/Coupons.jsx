import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { couponSchema } from "../schema/couponSchema";
import InputField from "../components/InputField";
import { couponStore } from "../stores/couponStore";
import { LoaderIcon } from "lucide-react";

function Coupons() {
  const { createCoupon, isCreateCoupons } = couponStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      expiresInHours: 24,
      isActive: true,
    },
  });

  const handleCoupon = async (data) => {
    await createCoupon(data);
     console.log(data);
     console.log(typeof data.discountPercentage);
  };

  return (
    <div className=" w-full">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold">Create Coupon</h1>

          <p className="text-sm opacity-60 mt-1">
            Create a discount coupon for your customers
          </p>
        </div>

        <div className="flex flex-col ">
          <form onSubmit={handleSubmit(handleCoupon)} className="space-y-6">
            <InputField
              label="Coupon Code"
              name="code"
              register={register}
              error={errors.code}
            />
            <InputField
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              placeholder="10"
              register={register}
              error={errors.discountPercentage}
            />
            <InputField
              label="Expires In Hours"
              type="number"
              name="expiresInHours"
              register={register}
              error={errors.expiresInHours}
            />
            <InputField
              label="Status"
              type="checkbox"
              name="isActive"
              register={register}
              error={errors.isActive}
            />
            <button type="submit" className="btn btn-success">
              {isCreateCoupons ? (
                <LoaderIcon className="w-full h-6 animate-spin text-center" />
              ) : (
                "Create Coupon"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Coupons;
