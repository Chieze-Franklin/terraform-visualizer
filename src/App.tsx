import React from 'react';
import Flow from "./Flow";
import { useSearchParams } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import './index.css';

function App() {
  let [searchParams,] = useSearchParams();
  // <img src={logo} className="App-logo" alt="logo" />

  let t = searchParams.get('t')?.trim();
  if (t?.endsWith(',')) {
    t = t.substring(0, t.length - 1);
  }
  return (
    <div className="App">
      <Flow t={t} />
    </div>
  );
}

export default App;
