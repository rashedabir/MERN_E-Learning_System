import axios from "axios";

const { useState, useEffect } = require("react");

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "https://course-hub-bd.herokuapp.com/user/infor",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setUser(res.data.user);
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
  };
}

export default UserAPI;
