import { LoaderIcon } from "lucide-react";
function IsLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderIcon className="size-20 animate-spin" />
    </div>
  );
}

export default IsLoading;
