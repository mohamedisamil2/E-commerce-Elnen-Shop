import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shippingAddressSchema } from "../schema/shippingAddress";
import OrderSummary from "../components/OrderSummary";
import InputField from "../components/InputField";
import { orderStore } from "../stores/orderStore";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { createOrdercash, createStripeCheckout } = orderStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      paymentMethod: "cash",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const navigate =useNavigate()

  const onSubmit = async (data) => {
    console.log(data);

    const shippingAddress = {
      fullName: data.fullName,
      phone: data.phone,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
    };

    if (data.paymentMethod === "cash") {
      const success= await createOrdercash({
        shippingAddress,
      });
       if (success) navigate("/order");
    } else {
      console.log("Online");
      const res = await createStripeCheckout({
        shippingAddress,
      });
      console.log(res);
      if (res?.url) {
        window.location.href = res.url;
      }
    }
  };

  // form bg
  const formStyle =
    "bg-linear-to-r from-emerald-500 via-emerald-700 to-emerald-300 shadow-sm rounded-md";

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full max-w-7xl ">
        {/* form */}
        <div className={` p-4 flex justify-center items-center ${formStyle}`}>
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold mb-5">Shipping Information</h2>
            <div className="flex justify-between gap-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="z-50 flex-1 flex flex-col bg-white p-4"
              >
                {/* row 1 */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <InputField
                      label="Full Name"
                      name="fullName"
                      register={register}
                      error={errors.fullName}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <InputField
                      label="Phone Number"
                      name="phone"
                      register={register}
                      error={errors.phone}
                    />
                  </div>
                </div>
                {/* row 2 */}
                <div className=" flex items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <InputField
                      label="City"
                      name="city"
                      register={register}
                      error={errors.city}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <InputField
                      label="Street"
                      name="street"
                      register={register}
                      error={errors.street}
                    />
                  </div>
                </div>
                {/* row 3 */}

                <div className="flex flex-col space-y-2">
                  <InputField
                    label="PostalCode"
                    name="postalCode"
                    register={register}
                    error={errors.postalCode}
                  />
                </div>
                {/* Payment */}

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="cash"
                        {...register("paymentMethod")}
                      />
                      Cash On Delivery
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Online"
                        {...register("paymentMethod")}
                      />
                      Credit Card (Stripe)
                    </label>

                    {errors.paymentMethod && (
                      <p className="text-red-500">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>

              {/* Summary  */}
              <OrderSummary
                paymentMethod={paymentMethod}
                onCheckout={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
