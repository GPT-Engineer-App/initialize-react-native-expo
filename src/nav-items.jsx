import { Home, BarChart, Settings, Camera, HelpCircle, Upload, Cloud } from "lucide-react";
import Index from "./pages/Index.jsx";
import Results from "./pages/Results.jsx";
import SettingsPage from "./pages/Settings.jsx";
import TensorflowDemo from "./pages/TensorflowDemo.jsx";
import HelpTutorial from "./pages/HelpTutorial.jsx";
import DatasetUpload from "./pages/DatasetUpload.jsx";
import CodehooksIntegration from "./pages/CodehooksIntegration.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Results",
    to: "/results",
    icon: <BarChart className="h-4 w-4" />,
    page: <Results />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <SettingsPage />,
  },
  {
    title: "Demo",
    to: "/demo",
    icon: <Camera className="h-4 w-4" />,
    page: <TensorflowDemo />,
  },
  {
    title: "Help",
    to: "/help",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <HelpTutorial />,
  },
  {
    title: "Train Model",
    to: "/train",
    icon: <Upload className="h-4 w-4" />,
    page: <DatasetUpload />,
  },
  {
    title: "Codehooks.io",
    to: "/codehooks",
    icon: <Cloud className="h-4 w-4" />,
    page: <CodehooksIntegration />,
  },
];