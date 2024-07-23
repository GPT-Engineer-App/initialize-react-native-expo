import { Home, BarChart, Settings, Camera, HelpCircle, Upload, Cloud, Database } from "lucide-react";
import Index from "./pages/Index.jsx";
import Results from "./pages/Results.jsx";
import SettingsPage from "./pages/Settings.jsx";
import TensorflowDemo from "./pages/TensorflowDemo.jsx";
import HelpTutorial from "./pages/HelpTutorial.jsx";
import DatasetUpload from "./pages/DatasetUpload.jsx";
import EnginelabsIntegration from "./pages/CodehooksIntegration.jsx";
import TrainingDataManager from "./components/TrainingDataManager.jsx";

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
    title: "EngineLabs.ai",
    to: "/enginelabs",
    icon: <Cloud className="h-4 w-4" />,
    page: <EnginelabsIntegration />,
  },
  {
    title: "Training Data",
    to: "/training-data",
    icon: <Database className="h-4 w-4" />,
    page: <TrainingDataManager />,
  },
];