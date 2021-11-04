import './Home.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';

/* 사용자에게 가장 먼저 보여지는 부분 */
const Home: React.FC = () => {
  return (
    <div>
      <Link to='/LoadSheet'>
        <input type="button" name="loadSheet" value='불러오기' />
      </Link>
      <Link to='/NewSheet'>
        <input type="button" name="newSheet" value='새로 만들기' />
      </Link>
    </div>
  );
}

export default Home;
