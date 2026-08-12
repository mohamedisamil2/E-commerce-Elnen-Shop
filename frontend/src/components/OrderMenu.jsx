import { orderStore } from "../stores/orderStore"

function OrderMenu({orde}) {
  
    const { updateStatusOfOrder } = orderStore();

    const getStatusClass = (orderStatus = "") => {
      switch (orderStatus) {
        case "Pending":
          return "badge-warning";

        case "Processing":
          return "badge-info";

        case "shipped":
          return "badge-primary";

        case "delivered":
          return "badge-success";

        case "cancelled":
          return "badge-error";

        default:
          return "badge-neutral";
      }
    };

    return (
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className={`badge ${getStatusClass(orde.orderStatus)}`}
        >
          {orde.orderStatus}
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-44"
        >
          <li>
            <button onClick={() => updateStatusOfOrder("Pending", orde._id)}>
              Pending
            </button>
          </li>

          <li>
            <button onClick={() => updateStatusOfOrder("Processing", orde._id)}>
              Processing
            </button>
          </li>

          <li>
            <button onClick={() => updateStatusOfOrder("shipped", orde._id)}>
              Shipped
            </button>
          </li>

          <li>
            <button onClick={() => updateStatusOfOrder("delivered", orde._id)}>
              Delivered
            </button>
          </li>

          <li>
            <button onClick={() => updateStatusOfOrder("cancelled", orde._id)}>
              Cancelled
            </button>
          </li>
        </ul>
      </div>
    );
}

export default OrderMenu