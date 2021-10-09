import axios from "axios";
import { useEffect, useState } from "react";

function CourseAPI() {
  const [courses, setCourses] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://course-hub-backend.herokuapp.com/api/courses?limit=${
          page * 8
        }&${category}&title[regex]=${search}`
      );
      setCourses(res.data.courses);
      setResult(res.data.result);
      setLoading(false);
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
    loading: [loading, setLoading],
  };
}

export default CourseAPI;
