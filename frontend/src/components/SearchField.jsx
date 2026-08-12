import { Search } from "lucide-react";
import { useState } from "react";

function SearchField() {
    const { keyword, setKeyword } = useState("")
    
    function handleSearch() {
        Navigation("/")
    }

    return (
    <div className="hidden md:hidden xl:flex justify-between items-center focus:ring-2 focus:ring-green-500 min-w-md rounded-lg border border-green-300 ">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="w-3/4 outline-none px-2 text-xl"
      />
      <Search
        className="bg-green-400 w-8 h-8 rounded-md"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchField