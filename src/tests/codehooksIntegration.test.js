import { dataStorageService } from '../services/dataStorageService';
import { notificationService } from '../services/notificationService';
import { modelTrainingService } from '../services/modelTrainingService';
import { feedbackService } from '../services/feedbackService';
import { analyticsService } from '../services/analyticsService';

describe('Codehooks.io Integration Tests', () => {
  // Data Storage Service Tests
  test('DataStorageService - CRUD operations', async () => {
    const testData = { name: 'Test Item', value: 42 };
    
    // Create
    const createdItem = await dataStorageService.createItem('test-collection', testData);
    expect(createdItem).toHaveProperty('_id');
    
    // Read
    const retrievedItem = await dataStorageService.getItem('test-collection', createdItem._id);
    expect(retrievedItem).toEqual(expect.objectContaining(testData));
    
    // Update
    const updatedData = { ...testData, value: 43 };
    const updatedItem = await dataStorageService.updateItem('test-collection', createdItem._id, updatedData);
    expect(updatedItem.value).toBe(43);
    
    // Delete
    await dataStorageService.deleteItem('test-collection', createdItem._id);
    const deletedItem = await dataStorageService.getItem('test-collection', createdItem._id);
    expect(deletedItem).toBeNull();
  });

  // Notification Service Tests
  test('NotificationService - Send and retrieve notifications', async () => {
    const userId = 'test-user-id';
    const message = 'Test notification';
    
    const sentNotification = await notificationService.sendNotification(userId, message);
    expect(sentNotification).toHaveProperty('_id');
    
    const notifications = await notificationService.getNotifications(userId);
    expect(notifications).toContainEqual(expect.objectContaining({ message }));
    
    await notificationService.markNotificationAsRead(sentNotification._id);
    const updatedNotification = await notificationService.getNotifications(userId);
    expect(updatedNotification[0].read).toBe(true);
  });

  // Model Training Service Tests
  test('ModelTrainingService - Upload data and start training job', async () => {
    const trainingData = { data: 'Sample training data' };
    const uploadedData = await modelTrainingService.uploadTrainingData(trainingData);
    expect(uploadedData).toHaveProperty('_id');
    
    const trainingJob = await modelTrainingService.startTrainingJob(uploadedData._id);
    expect(trainingJob).toHaveProperty('jobId');
    
    const jobStatus = await modelTrainingService.getTrainingJobStatus(trainingJob.jobId);
    expect(jobStatus).toHaveProperty('status');
  });

  // Feedback Service Tests
  test('FeedbackService - Submit and retrieve feedback', async () => {
    const detectionId = 'test-detection-id';
    const feedbackData = { accuracy: 0.9, comments: 'Good detection' };
    
    const submittedFeedback = await feedbackService.submitFeedback(detectionId, feedbackData);
    expect(submittedFeedback).toHaveProperty('_id');
    
    const retrievedFeedback = await feedbackService.getFeedbackForDetection(detectionId);
    expect(retrievedFeedback).toContainEqual(expect.objectContaining(feedbackData));
  });

  // Analytics Service Tests
  test('AnalyticsService - Track event and retrieve analytics', async () => {
    const userId = 'test-user-id';
    const eventName = 'test-event';
    const eventData = { action: 'click', target: 'button' };
    
    const trackedEvent = await analyticsService.trackEvent(userId, eventName, eventData);
    expect(trackedEvent).toHaveProperty('_id');
    
    const userAnalytics = await analyticsService.getUserAnalytics(userId);
    expect(userAnalytics).toContainEqual(expect.objectContaining({ eventName, eventData }));
    
    const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago
    const endDate = new Date().toISOString();
    const appPerformance = await analyticsService.getApplicationPerformance(startDate, endDate);
    expect(appPerformance).toHaveProperty('events');
    expect(appPerformance).toHaveProperty('uniqueUsers');
  });
});