import { useEffect, useState } from "react";
import axios from "axios";

function CategoriesAPI() {
  const [category, setCategory] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get(
      "https://course-hub-backend.herokuapp.com/api/category"
    );
    setCategory(res.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    category: [category, setCategory],
    callback: [callback, setCallback],
  };
}

export default CategoriesAPI;
