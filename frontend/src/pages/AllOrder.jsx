import { useEffect } from "react";
import { orderStore } from "../stores/orderStore";
import { format } from "date-fns";
import OrderMenu from "../components/OrderMenu";

function AllOrder() {
  const { order, allMyOrder } = orderStore();

  useEffect(() => {
    allMyOrder();
  }, [allMyOrder]);

  return (
    <div className="container w-full mx-auto bg-white rounded-md shadow-sm p-4">
      <h1 className="text-2xl font-semibold text-center mb-10">All Orders</h1>
      <table className="table table-md">
        <thead>
          <tr className="text-xl font-semibold text-slate-900">
            <th>#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {order.map((orde, index) => (
            <tr key={orde._id}>
              <th>{index + 1}</th>
              <td>{orde.user.name}</td>

              <td>${orde.totalAmount}</td>

              <td>{orde.paymentStatus}</td>

              <td>
                <OrderMenu orde={orde} />
              </td>

              <td>{format(new Date(orde.createdAt), "dd MMM yyyy")}</td>

              <td>
                <button className="btn btn-sm btn-primary">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrder;
