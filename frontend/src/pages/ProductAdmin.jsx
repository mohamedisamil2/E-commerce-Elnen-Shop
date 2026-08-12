import { useEffect } from "react";
import { adminProductStore } from "../stores/ProductStore";
import { LoaderIcon } from "lucide-react";

function ProductAdmin() {
  const {
    getAdminProducts,
    products,
    toggleFeatured,
    deleteProduct,
    isDeleting,
  } = adminProductStore();

  useEffect(() => {
    getAdminProducts();
  }, [getAdminProducts]);

  console.log("products:", products);
  return (
    <div className="container w-full mx-auto bg-white rounded-md shadow-sm p-4">
      <h1 className="text-2xl font-semibold text-center mb-10">All Products</h1>
      <table className="table table-md">
        <thead>
          <tr className="text-xl font-semibold text-slate-900">
            <th>#</th>
            <th>Producs</th>
            <th>Price</th>
            <th>Count In Stock</th>
            <th>is Featured</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item.name}</td>

              <td>${item.price}</td>

              <td>{item.countInStock}</td>
              <td>
                <select
                  value={item.isFeatured ? "Yes" : "No"}
                  onChange={() => {
                    toggleFeatured(item._id);
                  }}
                  className="select select-sm"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>

              <td>
                <button className="btn btn-sm btn-primary">View</button>
              </td>
              <td>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => deleteProduct(item._id)}
                >
                  {isDeleting ? (
                    <LoaderIcon className="w-full h-6 animate-spin text-center" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductAdmin;
