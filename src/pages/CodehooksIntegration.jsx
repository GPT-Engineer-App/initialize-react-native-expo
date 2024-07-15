import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { codehooksService } from '../services/codehooksService';

const CodehooksIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await codehooksService.getData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data from Codehooks.io",
        variant: "destructive",
      });
    }
  };

  const handleSaveConfig = () => {
    // TODO: Implement saving API configuration
    toast({
      title: "Configuration Saved",
      description: "Your Codehooks.io configuration has been saved.",
    });
  };

  const handleAddItem = async () => {
    try {
      await codehooksService.postData('items', { name: newItemName, value: newItemValue });
      setNewItemName('');
      setNewItemValue('');
      fetchData();
      toast({
        title: "Item Added",
        description: "New item has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add new item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await codehooksService.deleteDataById('items', id);
      fetchData();
      toast({
        title: "Item Deleted",
        description: "Item has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
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
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Item Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                      <Input
                        placeholder="Item Value"
                        value={newItemValue}
                        onChange={(e) => setNewItemValue(e.target.value)}
                      />
                      <Button onClick={handleAddItem}>Add Item</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.value}</TableCell>
                            <TableCell>
                              <Button variant="destructive" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
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