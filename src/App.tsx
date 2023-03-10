import React from 'react';
import Flow from "./Flow";
import { useSearchParams } from "react-router-dom";
import './index.css';
import { ReactFlowProvider } from 'reactflow';

function App() {
  let [ searchParams ] = useSearchParams();

  const content = searchParams.get('content')?.trim();
  const title = searchParams.get('title')?.trim();
  const integrated = searchParams.get('integrated')?.trim();

  return (
    <div className="app">
      <ReactFlowProvider>
        <Flow content={content} title={title} integrated={integrated} />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
