import { CreditCard, RotateCcw, ShieldCheck, Truck } from "lucide-react";

function ShopWithUs() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <Truck className="mx-auto mb-4 h-8 w-8 text-emerald-500" />

          <h3 className="font-semibold text-gray-800">Fast Delivery</h3>

          <p className="mt-2 text-sm text-gray-500">
            Fast and reliable delivery to your door.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-emerald-500" />

          <h3 className="font-semibold text-gray-800">Secure Shopping</h3>

          <p className="mt-2 text-sm text-gray-500">
            Your information is always protected.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <CreditCard className="mx-auto mb-4 h-8 w-8 text-emerald-500" />

          <h3 className="font-semibold text-gray-800">Secure Payment</h3>

          <p className="mt-2 text-sm text-gray-500">
            Safe and secure payment methods.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <RotateCcw className="mx-auto mb-4 h-8 w-8 text-emerald-500" />

          <h3 className="font-semibold text-gray-800">Easy Returns</h3>

          <p className="mt-2 text-sm text-gray-500">
            Simple and hassle-free returns.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShopWithUs;
