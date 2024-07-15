import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CodehooksIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const { toast } = useToast();

  const handleSaveConfig = () => {
    // TODO: Implement saving API configuration
    toast({
      title: "Configuration Saved",
      description: "Your Codehooks.io configuration has been saved.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Codehooks.io Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="api-config">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="api-config">API Configuration</TabsTrigger>
              <TabsTrigger value="data-management">Data Management</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="api-config">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Codehooks.io API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endpoint">Endpoint</Label>
                    <Input
                      id="endpoint"
                      value={endpoint}
                      onChange={(e) => setEndpoint(e.target.value)}
                      placeholder="Enter your Codehooks.io endpoint"
                    />
                  </div>
                  <Button onClick={handleSaveConfig}>Save Configuration</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="data-management">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* TODO: Implement data management functionality */}
                  <p>Data management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* TODO: Implement settings and customization options */}
                  <p>Settings and customization options coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodehooksIntegration;