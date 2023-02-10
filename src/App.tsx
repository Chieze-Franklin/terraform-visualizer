import React from 'react';
import Flow from "./Flow";
import { useSearchParams } from "react-router-dom";
import './index.css';

function App() {
  let [ searchParams ] = useSearchParams();

  const content = searchParams.get('content')?.trim();
  const title = searchParams.get('title')?.trim();

  return (
    <div className="app">
      <Flow content={content} title={title} />
    </div>
  );
}

export default App;
