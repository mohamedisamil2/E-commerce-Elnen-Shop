// import React from 'react'
import { useNavigate } from "react-router-dom";

function CategoryItem({ category }) {
  //   console.log("CATEGORY:", category);
  //   console.log("IMAGE:", category?.image);
  //   console.log("image Url", category.image.Url);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.name}`);
  };

  return (
    <div onClick={handleClick}>
      <div className="group relative h-72 overflow-hidden rounded-2xl">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white">{category.name}</h3>

          <p className="mt-1 text-sm text-gray-200">Explore {category.name}</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
