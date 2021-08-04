import axios from "axios";

const { useState, useEffect } = require("react");

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            "https://course-hub-bd.herokuapp.com/user/infor",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setUser(res.data.user);
          setLoading(false);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    user: [user, setUser],
    loading: [loading, setLoading],
  };
}

export default UserAPI;
