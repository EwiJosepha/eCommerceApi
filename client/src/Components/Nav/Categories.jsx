import "./nav.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Categories() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products/categories`);

      return res.data;
    },
  });

  console.log(data);
  return (
    <>
      <select id="category">
        {data?.map((categories, index) => (
          <option key={index}>
            {categories}
          </option>
        ))}
      </select>
    </>
  );
}

export default Categories;
