import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';
import { useEffect } from 'react';

function App() {


  return (
    <div className="App main-content" style={{ overflowX:'hidden' }}>
      <RouterProvider router={root}></RouterProvider>
    </div>
  );
}
export default App;