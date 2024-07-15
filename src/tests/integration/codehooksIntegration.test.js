import { dataStorageService } from '../../services/dataStorageService';
import { notificationService } from '../../services/notificationService';
import { modelTrainingService } from '../../services/modelTrainingService';
import { feedbackService } from '../../services/feedbackService';
import { analyticsService } from '../../services/analyticsService';

describe('Codehooks.io Integration Tests', () => {
  let userId;
  let detectionResultId;
  let feedbackId;

  beforeAll(async () => {
    // Create a test user
    const userData = { name: 'Test User', email: 'test@example.com' };
    const user = await dataStorageService.createUser(userData);
    userId = user.id;
  });

  afterAll(async () => {
    // Clean up: delete the test user
    await dataStorageService.deleteUser(userId);
  });

  test('Data Storage Service - CRUD operations', async () => {
    // Test user creation (already done in beforeAll)
    const user = await dataStorageService.getUser(userId);
    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');

    // Test user update
    const updatedUserData = { name: 'Updated Test User' };
    const updatedUser = await dataStorageService.updateUser(userId, updatedUserData);
    expect(updatedUser.name).toBe('Updated Test User');

    // Test saving detection result
    const detectionResult = { userId, result: 'Test Result' };
    const savedResult = await dataStorageService.saveDetectionResult(detectionResult);
    detectionResultId = savedResult.id;
    expect(savedResult).toBeDefined();

    // Test getting detection results
    const results = await dataStorageService.getDetectionResults(userId);
    expect(results).toHaveLength(1);
    expect(results[0].result).toBe('Test Result');
  });

  test('Notification Service', async () => {
    // Test sending notification
    const message = 'Test notification';
    const notification = await notificationService.sendNotification(userId, message);
    expect(notification).toBeDefined();

    // Test getting notifications
    const notifications = await notificationService.getNotifications(userId);
    expect(notifications).toHaveLength(1);
    expect(notifications[0].message).toBe(message);

    // Test marking notification as read
    const updatedNotification = await notificationService.markNotificationAsRead(notifications[0].id);
    expect(updatedNotification.read).toBe(true);

    // Test deleting notification
    await notificationService.deleteNotification(notifications[0].id);
    const emptyNotifications = await notificationService.getNotifications(userId);
    expect(emptyNotifications).toHaveLength(0);
  });

  test('Model Training Service', async () => {
    // Test uploading training data
    const trainingData = { data: 'Test training data' };
    const uploadedData = await modelTrainingService.uploadTrainingData(trainingData);
    expect(uploadedData).toBeDefined();

    // Test starting training job
    const modelConfig = { epochs: 10, batchSize: 32 };
    const trainingJob = await modelTrainingService.startTrainingJob(modelConfig);
    expect(trainingJob).toBeDefined();
    expect(trainingJob.status).toBe('started');

    // Test getting training status
    const trainingStatus = await modelTrainingService.getTrainingStatus(trainingJob.id);
    expect(trainingStatus).toBeDefined();

    // Test getting trained model
    const trainedModel = await modelTrainingService.getTrainedModel(trainingJob.id);
    expect(trainedModel).toBeDefined();
  });

  test('Feedback Service', async () => {
    // Test submitting feedback
    const feedback = { rating: 5, comment: 'Great detection!' };
    const submittedFeedback = await feedbackService.submitFeedback(userId, detectionResultId, feedback);
    feedbackId = submittedFeedback.id;
    expect(submittedFeedback).toBeDefined();

    // Test getting feedback
    const retrievedFeedback = await feedbackService.getFeedback(detectionResultId);
    expect(retrievedFeedback).toHaveLength(1);
    expect(retrievedFeedback[0].rating).toBe(5);

    // Test updating feedback
    const updatedFeedback = { rating: 4, comment: 'Good detection, but could be better' };
    const updatedFeedbackResult = await feedbackService.updateFeedback(feedbackId, updatedFeedback);
    expect(updatedFeedbackResult.rating).toBe(4);

    // Test deleting feedback
    await feedbackService.deleteFeedback(feedbackId);
    const emptyFeedback = await feedbackService.getFeedback(detectionResultId);
    expect(emptyFeedback).toHaveLength(0);
  });

  test('Analytics Service', async () => {
    // Test tracking event
    const eventName = 'test_event';
    const eventData = { action: 'click', target: 'button' };
    const trackedEvent = await analyticsService.trackEvent(userId, eventName, eventData);
    expect(trackedEvent).toBeDefined();

    // Test getting analytics
    const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago
    const endDate = new Date().toISOString();
    const analytics = await analyticsService.getAnalytics(userId, startDate, endDate);
    expect(analytics).toHaveLength(1);
    expect(analytics[0].eventName).toBe(eventName);

    // Test getting aggregated analytics
    const aggregatedAnalytics = await analyticsService.getAggregatedAnalytics('test_event', startDate, endDate);
    expect(aggregatedAnalytics).toBeDefined();
    expect(aggregatedAnalytics.count).toBe(1);
  });
});