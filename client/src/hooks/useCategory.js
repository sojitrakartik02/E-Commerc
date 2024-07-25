import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      setCategories(Array.isArray(data?.category) ? data.category : []);
    } catch (error) {
      console.log(error);

      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
