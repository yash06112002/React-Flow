import "./styles/App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home, { loader as workflowsLoader } from "./pages/Home"
import WorkFlowPage from "./pages/WorkFlowPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
        loader: workflowsLoader
      },
      {
        path: ":workFlowId",
        element: <WorkFlowPage />,
      }
    ]
  }
])
function App() {

  return <RouterProvider router={router} />;

}

export default App
