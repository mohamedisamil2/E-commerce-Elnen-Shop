function SkeletonLoadingProduct() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="card bg-base-100 shadow-md animate-pulse">
            <div className="skeleton h-80 w-full rounded-t-xl"></div>

            <div className="card-body space-y-3">
              <div className="skeleton h-6 w-2/3"></div>

              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="skeleton h-6 w-16"></div>
                <div className="skeleton h-10 w-28"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoadingProduct;
