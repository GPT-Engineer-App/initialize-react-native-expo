import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/navbar"; // Make sure this path is correct
import { Provider } from 'react-redux';
import { store } from './store/store';
import Index from "./pages/Index";
import Results from "./pages/Results";
import Settings from "./pages/Settings";
import TensorflowDemo from "./pages/TensorflowDemo";
import HelpTutorial from "./pages/HelpTutorial";
import DatasetUpload from "./pages/DatasetUpload";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/results" element={<Results />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/demo" element={<TensorflowDemo />} />
              <Route path="/help" element={<HelpTutorial />} />
              <Route path="/train" element={<DatasetUpload />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;