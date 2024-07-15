import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from '../components/CodehooksIntegration/Dashboard';
import DetailedLogs from '../components/CodehooksIntegration/DetailedLogs';

const CodehooksIntegration = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Codehooks.io Integration</CardTitle>
          <CardDescription>Manage your Codehooks.io integration and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="logs">
              <DetailedLogs />
            </TabsContent>
            <TabsContent value="users">
              {/* User Management component will be added here */}
              <p>User Management content coming soon...</p>
            </TabsContent>
            <TabsContent value="endpoints">
              {/* Custom Endpoints component will be added here */}
              <p>Custom Endpoints content coming soon...</p>
            </TabsContent>
            <TabsContent value="settings">
              {/* Settings component will be added here */}
              <p>Settings content coming soon...</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodehooksIntegration;