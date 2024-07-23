import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Dashboard from '../components/CodehooksIntegration/Dashboard';
import { engineLabsService } from '../services/engineLabsService';

const EnginelabsIntegration = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [customEndpoints, setCustomEndpoints] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState({ name: '', description: '', code: '' });

  useEffect(() => {
    fetchLogs();
    fetchUsers();
    fetchCustomEndpoints();
  }, []);

  const fetchLogs = async () => {
    try {
      const logsData = await engineLabsService.getLogs();
      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Failed to fetch logs');
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await engineLabsService.read('users');
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const fetchCustomEndpoints = async () => {
    try {
      const endpoints = await engineLabsService.getCustomEndpoints();
      setCustomEndpoints(endpoints);
    } catch (error) {
      console.error('Error fetching custom endpoints:', error);
      toast.error('Failed to fetch custom endpoints');
    }
  };

  const handleCreateEndpoint = async () => {
    try {
      await engineLabsService.createCustomEndpoint(newEndpoint);
      toast.success('Custom endpoint created successfully');
      fetchCustomEndpoints();
      setNewEndpoint({ name: '', description: '', code: '' });
    } catch (error) {
      console.error('Error creating custom endpoint:', error);
      toast.error('Failed to create custom endpoint');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>EngineLabs.ai Integration</CardTitle>
          <CardDescription>Manage your EngineLabs.ai integration and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="endpoints">Custom Endpoints</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="logs">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Logs</h3>
                <ul className="space-y-2">
                  {logs.map((log, index) => (
                    <li key={index} className="bg-secondary p-2 rounded">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="users">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Management</h3>
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li key={user.id} className="bg-secondary p-2 rounded flex justify-between items-center">
                      <span>{user.name} ({user.email})</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="endpoints">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Endpoints</h3>
                <div className="space-y-2">
                  {customEndpoints.map((endpoint) => (
                    <Card key={endpoint.id}>
                      <CardHeader>
                        <CardTitle>{endpoint.name}</CardTitle>
                        <CardDescription>{endpoint.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-secondary p-2 rounded">{endpoint.code}</pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Endpoint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateEndpoint(); }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newEndpoint.name}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newEndpoint.description}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, description: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code">Code</Label>
                        <Textarea
                          id="code"
                          value={newEndpoint.code}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, code: e.target.value })}
                          required
                          rows={10}
                        />
                      </div>
                      <Button type="submit">Create Endpoint</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">EngineLabs.ai Settings</h3>
                <p>Configure your EngineLabs.ai integration settings here.</p>
                {/* Add settings form or components here */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnginelabsIntegration;