function SkeletonLoadingOrders() {
  return (
    <div className="container mx-auto">
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-30"></div>
        <div className="skeleton h-4 w-34"></div>
      </div>
    </div>
  );
}

export default SkeletonLoadingOrders;
