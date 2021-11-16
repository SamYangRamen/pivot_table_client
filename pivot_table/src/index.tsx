import ReactDOM from 'react-dom';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Root from './component/Root';

// 가장 먼저 실행되는 부분
ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
