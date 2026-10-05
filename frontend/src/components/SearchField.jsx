import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchField() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault(); // يمنع ريفريش الصفحة
    navigate(`/?search=${encodeURIComponent(keyword.trim())}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="hidden xl:flex w-full max-w-md items-center overflow-hidden rounded-lg border border-green-300 focus-within:ring-2 focus-within:ring-green-500"
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="bg-green-600 px-3 py-3 text-white hover:bg-green-700 transition-colors"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

export default SearchField;
