import "./app.css"
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import root from './router/root';

function App() {
  return (
      <Layout>
        <RouterProvider router={root} />
      </Layout> 
  );
}

export default App;
