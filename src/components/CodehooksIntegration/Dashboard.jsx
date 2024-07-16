import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, Brain, MessageSquare, Database } from "lucide-react";
import { codehooksService } from '../../services/codehooksService';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    storageUsage: 0,
    recentNotifications: [],
    modelStatus: '',
    feedbackStats: { positive: 0, negative: 0 }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const storageData = await codehooksService.getCollectionData('storage_usage');
        const notificationsData = await codehooksService.getCollectionData('notifications');
        const modelData = await codehooksService.getCollectionData('model_status');
        const feedbackData = await codehooksService.getCollectionData('feedback');

        setMetrics({
          storageUsage: storageData.usage || 0,
          recentNotifications: notificationsData.slice(0, 5) || [],
          modelStatus: modelData.status || 'Unknown',
          feedbackStats: {
            positive: feedbackData.filter(f => f.rating > 3).length,
            negative: feedbackData.filter(f => f.rating <= 3).length
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.storageUsage}%</div>
          <Progress value={metrics.storageUsage} className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Notifications</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.recentNotifications.length}</div>
          <p className="text-xs text-muted-foreground">in the last 24 hours</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Model Status</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.modelStatus}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Feedback Stats</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((metrics.feedbackStats.positive / (metrics.feedbackStats.positive + metrics.feedbackStats.negative)) * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">positive feedback</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;