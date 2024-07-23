import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { createTrainingData, getAllTrainingData, updateTrainingData, deleteTrainingData } from '../api/trainingData';

const TrainingDataManager = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [newData, setNewData] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = async () => {
    try {
      const data = await getAllTrainingData();
      setTrainingData(data);
    } catch (error) {
      console.error('Error fetching training data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch training data",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    try {
      await createTrainingData({ data: newData });
      setNewData('');
      fetchTrainingData();
      toast({
        title: "Success",
        description: "Training data uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading training data:', error);
      toast({
        title: "Error",
        description: "Failed to upload training data",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      await updateTrainingData(id, { data: editingData });
      setEditingId(null);
      fetchTrainingData();
      toast({
        title: "Success",
        description: "Training data updated successfully",
      });
    } catch (error) {
      console.error('Error editing training data:', error);
      toast({
        title: "Error",
        description: "Failed to update training data",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrainingData(id);
      fetchTrainingData();
      toast({
        title: "Success",
        description: "Training data deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting training data:', error);
      toast({
        title: "Error",
        description: "Failed to delete training data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training Data Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              placeholder="Enter new training data"
              className="flex-grow"
            />
            <Button onClick={handleUpload}>Upload</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    {editingId === data.id ? (
                      <Input
                        value={editingData}
                        onChange={(e) => setEditingData(e.target.value)}
                      />
                    ) : (
                      data.data
                    )}
                  </TableCell>
                  <TableCell>{new Date(data.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    {editingId === data.id ? (
                      <>
                        <Button onClick={() => handleEdit(data.id)} className="mr-2">Save</Button>
                        <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => { setEditingId(data.id); setEditingData(data.data); }} className="mr-2">Edit</Button>
                        <Button onClick={() => handleDelete(data.id)} variant="destructive">Delete</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingDataManager;