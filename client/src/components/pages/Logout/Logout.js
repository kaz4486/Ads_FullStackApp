import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`http://localhost:8000/auth/logout`, options).then(() => {
      dispatch(logOut());
      setTimeout(() => {
        return navigate('/');
      }, 1000);
    });
  }, [dispatch, navigate]);

  return null;
};
export default Logout;
