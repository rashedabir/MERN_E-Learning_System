import axios from "axios";
import { toast } from "react-toastify";

const { useState, useEffect } = require("react");

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            "https://course-hub-backend.herokuapp.com/user/infor",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          setList(res.data.user.list);
          res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setUser(res.data.user);
          setLoading(false);
          toast.success("Wellcome");
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addList = async (course) => {
    if (!isLogged) {
      return alert("Please Login or Registration to Continue Buying");
    }

    const check = list.every((item) => {
      return item._id !== course._id;
    });

    if (check) {
      setList([...list, { ...course }]);

      await axios.patch(
        "https://course-hub-backend.herokuapp.com/user/addlist",
        { list: [...list, { ...course }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Successfully Enrolled");
    } else {
      toast.warn("Already Enrolled in This Course");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    user: [user, setUser],
    loading: [loading, setLoading],
    addList: addList,
    list: [list, setList],
  };
}

export default UserAPI;
