function SkeletonLoadingCart() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-slate-800/30 rounded-lg p-4 animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 rounded bg-slate-700 w-3/4 mb-2"></div>
              <div className="h-3 rounded bg-slate-700/70  w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoadingCart;
