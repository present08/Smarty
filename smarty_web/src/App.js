import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';


function App() {
  return (
    <div className="App main-content">
      <RouterProvider router={root}></RouterProvider>
    </div>
  );
}
export default App;