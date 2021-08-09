import axios from "axios";
import { useEffect, useState } from "react";

function CourseAPI() {
  const [courses, setCourses] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getCourses = async () => {
      const res = await axios.get(
        `https://course-hub-backend.herokuapp.com/api/courses?limit=${
          page * 8
        }&${category}&title[regex]=${search}`
      );
      setCourses(res.data.courses);
      setResult(res.data.result);
    };
    getCourses();
  }, [callback, category, page, search]);

  return {
    courses: [courses, setCourses],
    callback: [callback, setCallback],
    category: [category, setCategory],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default CourseAPI;
