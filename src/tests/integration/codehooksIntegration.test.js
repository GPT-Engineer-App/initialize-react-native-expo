import { dataStorageService } from '../../services/dataStorageService';
import { notificationService } from '../../services/notificationService';
import { modelTrainingService } from '../../services/modelTrainingService';
import { feedbackService } from '../../services/feedbackService';
import { analyticsService } from '../../services/analyticsService';
import { COLLECTIONS } from '../../config/api';

describe('Codehooks.io Integration Tests', () => {
  let testUserId;

  beforeAll(async () => {
    // Create a test user
    const testUser = await dataStorageService.create(COLLECTIONS.USERS, { name: 'Test User', email: 'test@example.com' });
    testUserId = testUser._id;
  });

  afterAll(async () => {
    // Clean up test user
    await dataStorageService.delete(COLLECTIONS.USERS, testUserId);
  });

  test('Data Storage Service - CRUD operations', async () => {
    // Create
    const createdData = await dataStorageService.create(COLLECTIONS.TRAINING_DATA, { userId: testUserId, data: 'test data' });
    expect(createdData).toHaveProperty('_id');

    // Read
    const readData = await dataStorageService.read(COLLECTIONS.TRAINING_DATA, createdData._id);
    expect(readData).toEqual(createdData);

    // Update
    const updatedData = await dataStorageService.update(COLLECTIONS.TRAINING_DATA, createdData._id, { data: 'updated test data' });
    expect(updatedData.data).toBe('updated test data');

    // Delete
    await dataStorageService.delete(COLLECTIONS.TRAINING_DATA, createdData._id);
    await expect(dataStorageService.read(COLLECTIONS.TRAINING_DATA, createdData._id)).rejects.toThrow();
  });

  test('Notification Service', async () => {
    const message = 'Test notification';
    const sentNotification = await notificationService.sendNotification(testUserId, message);
    expect(sentNotification).toHaveProperty('_id');

    const notifications = await notificationService.getNotifications(testUserId);
    expect(notifications).toContainEqual(expect.objectContaining({ message }));
  });

  test('Model Training Service', async () => {
    const trainingData = { userId: testUserId, images: ['base64encodedimage1', 'base64encodedimage2'] };
    const uploadResult = await modelTrainingService.uploadTrainingData(trainingData);
    expect(uploadResult).toHaveProperty('success', true);

    const startJobResult = await modelTrainingService.startTrainingJob();
    expect(startJobResult).toHaveProperty('jobId');

    const trainedModel = await modelTrainingService.getTrainedModel();
    expect(trainedModel).toHaveProperty('modelUrl');
  });

  test('Feedback Service', async () => {
    const feedback = { userId: testUserId, detectionId: 'someDetectionId', rating: 4, comment: 'Good detection' };
    const submittedFeedback = await feedbackService.submitFeedback(feedback);
    expect(submittedFeedback).toHaveProperty('_id');

    const allFeedback = await feedbackService.getFeedback();
    expect(allFeedback).toContainEqual(expect.objectContaining(feedback));
  });

  test('Analytics Service', async () => {
    const event = { userId: testUserId, eventType: 'detection', details: { itemType: 'bottle', confidence: 0.95 } };
    const trackedEvent = await analyticsService.trackEvent(event);
    expect(trackedEvent).toHaveProperty('_id');

    const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago
    const endDate = new Date().toISOString();
    const analytics = await analyticsService.getAnalytics(startDate, endDate);
    expect(analytics).toContainEqual(expect.objectContaining(event));
  });
});