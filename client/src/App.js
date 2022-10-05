import { Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/pages/Home';
import Ad from './components/common/Ad';
import AdCreate from './components/pages/AdCreate';
import AdSummary from './components/common/AdSummary';
import SignUp from './components/pages/SignUp';
import AdEdit from './components/pages/AdEdit';
import Login from './components/pages/Login';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ads/:id' element={<Ad />} />
      <Route path='/ads/ad' element={<AdCreate />} />
      <Route path='/ads/edit/:id' element={<AdEdit />} />
      <Route path='/ads/search/:searchPhrase' element={<AdSummary />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </MainLayout>
);

export default App;
