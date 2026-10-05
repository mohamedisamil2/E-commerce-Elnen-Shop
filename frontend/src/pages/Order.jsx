import { useEffect } from "react";
import { orderStore } from "../stores/orderStore";
import SkeletonLoadingOrders from "../components/SkeletonLoadingOrders";

function Order() {
  const { order, showMyOrder, isOrderLoading } = orderStore();

  useEffect(() => {
    showMyOrder();
  }, [showMyOrder]);
  
  const myorder = order;

  console.log(order);

  if (isOrderLoading) return <SkeletonLoadingOrders />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {myorder.map((item) => (
        <div key={item._id} className="card bg-base-100 shadow mb-5 p-5">
          <h2>Order #{item._id}</h2>

          <p>Total: ${item.totalAmount}</p>

          <p>
            Status:
            {item.orderStatus}
          </p>

          <p>
            Payment:
            {item.paymentMethod}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Order;
