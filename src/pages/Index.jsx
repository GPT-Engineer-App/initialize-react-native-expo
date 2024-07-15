import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, incrementManualCount } from '../store/countersSlice';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { codehooksService } from '../services/codehooksService';

const Index = () => {
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counters);
  const selectedItem = useSelector((state) => state.settings.selectedItem);
  const { toast } = useToast();
  const [codehooksData, setCodehooksData] = useState(null);

  useEffect(() => {
    console.log('Index component mounted');
    const interval = setInterval(() => {
      if (selectedItem && selectedItem !== 'glass_bottle') {
        dispatch(incrementCount({ item: selectedItem, amount: Math.floor(Math.random() * 3) }));
      }
    }, 5000); // Update every 5 seconds

    // Fetch data from Codehooks
    codehooksService.getData()
      .then(data => {
        setCodehooksData(data);
        toast({
          title: "Codehooks Data Fetched",
          description: "Successfully retrieved data from Codehooks.",
        });
      })
      .catch(error => {
        console.error('Error fetching Codehooks data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch data from Codehooks.",
          variant: "destructive",
        });
      });

    return () => clearInterval(interval);
  }, [dispatch, selectedItem, toast]);

  const handleManualIncrement = () => {
    dispatch(incrementManualCount({ item: 'glass_bottle', date: new Date().toISOString().split('T')[0] }));
    toast({
      title: "Glass Bottle Count Incremented",
      description: "The glass bottle count has been manually increased.",
    });
  };

  if (!counters) {
    console.error('Counters is undefined');
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Recycling Counters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(counters).map(([item, counts]) => (
                <Card key={item}>
                  <CardHeader>
                    <CardTitle className="text-lg capitalize">{item.replace('_', ' ')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Progress value={(Object.values(counts.counts).reduce((a, b) => a + b, 0) / 100) * 100} max={100} className="w-full" />
                      <span className="text-sm font-medium">{Object.values(counts.counts).reduce((a, b) => a + b, 0)}</span>
                    </div>
                    {item === 'glass_bottle' && (
                      <Button onClick={handleManualIncrement} className="mt-2">
                        Increment Glass Bottle
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link to="/results">
                <Button>View Detailed Results</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      {codehooksData && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Codehooks Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(codehooksData, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;