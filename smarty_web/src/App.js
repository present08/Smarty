<<<<<<< HEAD
import { RouterProvider } from "react-router-dom";
import root from './router/root'

function App() {
  return (
    <>
     <RouterProvider router={root}></RouterProvider> 
    </>
=======
import { RouterProvider } from 'react-router-dom';  // BrowserRouter, Route, Routes 제거
import './App.css';
import root from './router/root';


function App() {
  return (
    <div className="App main-content">
      <RouterProvider router={root}></RouterProvider>
    </div>
>>>>>>> main
  );
}

export default App;
