import axios from "axios";
import { useEffect, useState } from "react";

function CourseAPI() {
  const [courses, setCourses] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      const res = await axios.get("/api/courses");
      setCourses(res.data.courses);
    };
    getCourses();
  }, [callback]);

  return {
    courses: [courses, setCourses],
    callback: [callback, setCallback],
  };
}

export default CourseAPI;
