import { dataStorageService } from '../../services/dataStorageService';
import { modelTrainingService } from '../../services/modelTrainingService';
import { COLLECTIONS } from '../../config/api';

describe('Codehooks.io Routes Tests', () => {
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

  test('/improveModel endpoint', async () => {
    const modelData = {
      userId: testUserId,
      screenshot: 'base64encodedimage',
      metadata: {
        itemType: 'bottle',
        quantity: 1,
        lighting: 'bright',
        background: 'white',
        additionalNotes: 'Clear plastic bottle'
      }
    };

    const result = await modelTrainingService.uploadTrainingData(modelData);
    expect(result).toHaveProperty('success', true);
  });

  test('/userData endpoint', async () => {
    const userData = await dataStorageService.read(COLLECTIONS.USERS, testUserId);
    expect(userData).toHaveProperty('_id', testUserId);
    expect(userData).toHaveProperty('name', 'Test User');
    expect(userData).toHaveProperty('email', 'test@example.com');
  });

  test('/saveDetectionArea and /getDetectionArea/:userId endpoints', async () => {
    const detectionArea = {
      userId: testUserId,
      x: 10,
      y: 20,
      width: 100,
      height: 200
    };

    // Save detection area
    await dataStorageService.create(COLLECTIONS.USERS, detectionArea);

    // Get detection area
    const savedArea = await dataStorageService.read(COLLECTIONS.USERS, testUserId);
    expect(savedArea).toMatchObject(detectionArea);
  });

  test('/incrementCount endpoint', async () => {
    const initialCount = await dataStorageService.read(COLLECTIONS.USERS, testUserId);
    
    const incrementData = {
      userId: testUserId,
      itemType: 'bottle',
      count: 1
    };

    await dataStorageService.update(COLLECTIONS.USERS, testUserId, {
      [`counts.${incrementData.itemType}`]: (initialCount.counts?.[incrementData.itemType] || 0) + incrementData.count
    });

    const updatedCount = await dataStorageService.read(COLLECTIONS.USERS, testUserId);
    expect(updatedCount.counts[incrementData.itemType]).toBe((initialCount.counts?.[incrementData.itemType] || 0) + incrementData.count);
  });
});