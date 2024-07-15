import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tensorflowService } from '../lib/tensorflowService';
import { codehooksService } from '../lib/codehooksService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { incrementCount } from '../store/countersSlice';
import { saveDetectionArea } from '../store/settingsSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toPng } from 'html-to-image';

const TensorflowDemo = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [capturedScreenshot, setCapturedScreenshot] = useState(null);
  const [screenshotMetadata, setScreenshotMetadata] = useState({
    itemType: '',
    quantity: '',
    lighting: '',
    background: '',
    additionalNotes: ''
  });
  const [isScreenshotDialogOpen, setIsScreenshotDialogOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.settings.selectedItem);
  const detectionArea = useSelector((state) => state.settings.detectionArea);
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tensorflowService.loadModel();
        setIsModelLoaded(true);
        toast({
          title: "Model loaded successfully",
          description: "Ready to start object detection",
        });
        await codehooksService.trackAnalytics({ event: 'model_loaded' });
      } catch (error) {
        console.error('Error loading the model:', error);
        toast({
          title: "Error loading model",
          description: "Please check your connection and try again",
          variant: "destructive",
        });
      }
    };
    loadModel();
  }, [toast]);

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsDetecting(true);
      await codehooksService.trackAnalytics({ event: 'detection_started' });
    } catch (error) {
      console.error('Error accessing the camera:', error);
      toast({
        title: "Camera access error",
        description: "Unable to access the camera",
        variant: "destructive",
      });
    }
  };

  const stopDetection = async () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    setIsDetecting(false);
    await codehooksService.trackAnalytics({ event: 'detection_stopped' });
  };

  const detectFrame = async () => {
    if (!isDetecting || !videoRef.current || !canvasRef.current) return;

    const detectedObjects = await tensorflowService.detectObjects(videoRef.current, selectedItem);
    const itemsInArea = detectedObjects.filter(obj => 
      obj.bbox[0] >= detectionArea.x && 
      obj.bbox[1] >= detectionArea.y && 
      obj.bbox[0] + obj.bbox[2] <= detectionArea.x + detectionArea.width && 
      obj.bbox[1] + obj.bbox[3] <= detectionArea.y + detectionArea.height
    ).length;

    if (itemsInArea > 0) {
      dispatch(incrementCount({ item: selectedItem, amount: itemsInArea }));
      
      await codehooksService.storeDetectionResult({
        item: selectedItem,
        count: itemsInArea,
        timestamp: new Date().toISOString(),
      });

      await codehooksService.sendNotification(
        'user123', // Replace with actual user ID
        `${itemsInArea} ${selectedItem.replace('_', ' ')}(s) detected`
      );
      
      toast({
        title: `${selectedItem.replace('_', ' ')} Detected`,
        description: `${itemsInArea} item(s) detected in the area`,
      });
    }

    requestAnimationFrame(detectFrame);
  };

  const handleSaveScreenshot = async () => {
    try {
      await tensorflowService.improveModel(capturedScreenshot, screenshotMetadata);
      await codehooksService.storeTrainingData({
        screenshot: capturedScreenshot,
        metadata: screenshotMetadata,
      });
      toast({
        title: "Model improved",
        description: "The screenshot and metadata have been used to improve the model",
      });
    } catch (error) {
      console.error('Error improving model:', error);
      toast({
        title: "Model improvement error",
        description: "Unable to improve the model with the provided data",
        variant: "destructive",
      });
    }

    setIsScreenshotDialogOpen(false);
    setScreenshotMetadata({
      itemType: '',
      quantity: '',
      lighting: '',
      background: '',
      additionalNotes: ''
    });
    setCapturedScreenshot(null);
  };

  // ... (rest of the component implementation)

  return (
    <div>
      {/* Add your JSX for the TensorflowDemo component */}
    </div>
  );
};

export default TensorflowDemo;