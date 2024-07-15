import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tensorflowService } from '../lib/tensorflowService';
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
import { storeDetectionResults } from '../lib/dataStorage';
import { sendNotification } from '../lib/notifications';
import { submitFeedback } from '../lib/feedback';
import { trackEvent } from '../lib/analytics';

const TensorflowDemo = () => {
  const [detectedItems, setDetectedItems] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.settings.selectedItem);
  const detectionArea = useSelector((state) => state.settings.detectionArea);
  const [userId, setUserId] = useState('user123'); // TODO: Implement proper user management

  const handleDetection = async () => {
    if (!isDetecting) {
      setIsDetecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const detectFrame = async () => {
        if (isDetecting && videoRef.current && canvasRef.current) {
          const detectedItems = await tensorflowService.detectObjects(videoRef.current, selectedItem);
          setDetectedItems(detectedItems);
          dispatch(incrementCount({ item: selectedItem, amount: detectedItems.length }));

          // Store detection results
          await storeDetectionResults({
            items: detectedItems,
            timestamp: new Date().toISOString(),
          });

          // Send notification if a significant number of items are detected
          if (detectedItems.length > 5) {
            await sendNotification(userId, `Detected ${detectedItems.length} items!`);
          }

          // Track detection event
          await trackEvent({
            type: 'detection',
            itemCount: detectedItems.length,
            timestamp: new Date().toISOString(),
          });

          requestAnimationFrame(detectFrame);
        }
      };

      detectFrame();
    } else {
      setIsDetecting(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleFeedback = async (feedback) => {
    await submitFeedback({
      userId,
      feedback,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>TensorFlow Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <video ref={videoRef} className="w-full max-w-lg" />
          <canvas ref={canvasRef} className="w-full max-w-lg" />
          <Button onClick={handleDetection}>
            {isDetecting ? 'Stop Detection' : 'Start Detection'}
          </Button>
          <div>
            <h3>Detected Items:</h3>
            <ul>
              {detectedItems.map((item, index) => (
                <li key={index}>{item.class} - Confidence: {item.score.toFixed(2)}</li>
              ))}
            </ul>
          </div>
          <Textarea
            placeholder="Provide feedback on detection accuracy"
            onChange={(e) => handleFeedback(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TensorflowDemo;