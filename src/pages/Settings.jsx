import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { setSelectedItem, setDarkMode, setNotificationsEnabled, setDetectionThreshold } from '../store/settingsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { selectedItem, darkMode, notificationsEnabled, detectionThreshold } = useSelector((state) => state.settings);
  const { toast } = useToast();

  const handleItemSelection = (value) => {
    dispatch(setSelectedItem(value));
  };

  const handleDarkModeToggle = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const handleNotificationsToggle = () => {
    dispatch(setNotificationsEnabled(!notificationsEnabled));
  };

  const handleThresholdChange = (value) => {
    dispatch(setDetectionThreshold(value[0]));
  };

  const saveSettings = () => {
    // In a real application, you might want to save this to local storage or a backend
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Item Selection</h3>
              <p className="text-sm text-gray-500">Choose the item type for detection</p>
              <Select onValueChange={handleItemSelection} value={selectedItem || ""}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select an item to detect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet_1">PET 1 Plastic Bottles</SelectItem>
                  <SelectItem value="hdpe_2">HDPE 2 Plastic Bottles</SelectItem>
                  <SelectItem value="aluminum_can">Aluminum Cans</SelectItem>
                  <SelectItem value="cardboard_carton">Cardboard Cartons</SelectItem>
                  <SelectItem value="glass_bottle">Glass Bottles (Manual Count)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationsToggle}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>

            <div>
              <Label htmlFor="detection-threshold">Detection Threshold</Label>
              <Slider
                id="detection-threshold"
                min={0}
                max={1}
                step={0.01}
                value={[detectionThreshold]}
                onValueChange={handleThresholdChange}
              />
              <p className="text-sm text-gray-500">Current value: {detectionThreshold}</p>
            </div>

            <Button onClick={saveSettings}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;