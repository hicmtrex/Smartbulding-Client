import { useState, useEffect } from 'react';
import myAxios from '../utils/axios';

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await myAxios.get('/user/:id', {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
}

export default UserAPI;
