import { useEffect, useState } from 'react';
import './App.css';
import './App.scss'
// import CMainRouter from './components/CMainRouter';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { GetUserInfoRequest } from './common/define-identity';
import AnimationRouter from './components/AnimationRouter';
import CFooter from './components/Footer/CFooter';
import { CHeader } from './components/Header/CHeader';
import { getUserInfoRequest } from './redux/controller';
import { useDispatchRoot } from './redux/store';

function App() {
  return (
    <Layout>
      <CHeader />
      <AnimationRouter />
      <CFooter />
    </Layout>
  );
}

export default App;
