import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tensorflowService } from '../lib/tensorflowService';
import { codehooksService } from '../lib/codehooksService';

const DatasetUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedData, setParsedData] = useState(null);
  const [trainingStatus, setTrainingStatus] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const parseFiles = useCallback(async () => {
    // Implement file parsing logic here
    // This is a placeholder implementation
    const parsed = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setParsedData(parsed);
  }, [files]);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select a folder to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      await parseFiles();

      // Simulating file processing
      for (let i = 0; i < files.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(((i + 1) / files.length) * 100);
      }

      // Store training data in Codehooks.io
      await codehooksService.storeTrainingData(parsedData);

      toast({
        title: "Upload complete",
        description: `${files.length} files processed successfully`,
      });

      // Start training process
      initiateTraining();
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "An error occurred while processing the files",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const initiateTraining = async () => {
    if (!parsedData) {
      toast({
        title: "No data available",
        description: "Please upload dataset first",
        variant: "destructive",
      });
      return;
    }

    setTrainingStatus('Initiating training...');
    try {
      // Start model training using Codehooks.io
      const trainingJob = await codehooksService.startModelTraining({
        datasetId: parsedData.id, // Assuming the stored training data has an ID
        modelType: 'object_detection',
        // Add any other necessary training configuration
      });

      // Poll for training status
      const checkTrainingStatus = async () => {
        const status = await codehooksService.getTrainedModel(trainingJob.id);
        if (status.status === 'completed') {
          setTrainingStatus('Training completed successfully!');
          // Update the model in the application
          await tensorflowService.updateModel(status.modelUrl);
          toast({
            title: "Training complete",
            description: "The model has been trained with the new dataset",
          });
        } else if (status.status === 'failed') {
          setTrainingStatus('Error occurred during training');
          toast({
            title: "Training error",
            description: "An error occurred while training the model",
            variant: "destructive",
          });
        } else {
          // Still in progress, check again after a delay
          setTimeout(checkTrainingStatus, 5000);
        }
      };

      checkTrainingStatus();
    } catch (error) {
      console.error('Error training model:', error);
      setTrainingStatus('Error occurred during training');
      toast({
        title: "Training error",
        description: "An error occurred while training the model",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Dataset Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dataset-upload">Select Dataset Files</Label>
              <Input
                id="dataset-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
              {uploading ? 'Uploading...' : 'Upload Dataset'}
            </Button>
            {uploading && (
              <Progress value={progress} max={100} className="w-full" />
            )}
            {trainingStatus && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Training Status</h3>
                <p>{trainingStatus}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetUpload;