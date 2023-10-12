import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Drugs from "./Features/Drugs";
import DrugDetails from "./Features/DrugDetails";


const router = createBrowserRouter([
  {
    path: "/drugs",
    element: <Drugs />,
  },
  {
    path: "/drugs/:drugName",
    exact: true,
    element: <DrugDetails />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
