import { Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/pages/Home';
import Ad from './components/common/Ad/Ad';
import AdCreate from './components/pages/AdCreate';
import AdSummary from './components/common/AdSummary/AdSummary';
import Register from './components/pages/Register';
import AdEdit from './components/pages/AdEdit';
import Login from './components/pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser, logIn } from './redux/usersRedux';

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector(getUser);
  // console.log(user);

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    };
    fetch(`http://localhost:8000/auth/user`, options).then((res) => {
      if (res.status === 200) {
        // dispatch(logIn(??));
      }
    });
  }, [dispatch]);
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/:id' element={<Ad />} />
        <Route path='/ads/create' element={<AdCreate />} />
        <Route path='/ads/edit/:id' element={<AdEdit />} />
        <Route path='/ads/search/:searchPhrase' element={<AdSummary />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
