import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from "./routers/index.tsx"
function App() {
  return <RouterProvider router={routes} />
}

export default App;
