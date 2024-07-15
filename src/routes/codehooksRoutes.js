import { dataStorageService } from '../services/dataStorageService';
import { COLLECTIONS } from '../config/api';

export const improveModel = async (req, res) => {
  try {
    const { screenshot, metadata } = req.body;
    console.log('Received data for model improvement:', { screenshot, metadata });
    res.json({ success: true, message: 'Model improvement data received' });
  } catch (error) {
    console.error('Error in improveModel:', error);
    res.status(500).json({ success: false, message: 'Error processing model improvement data' });
  }
};

export const getUserData = async (req, res) => {
  try {
    const users = await dataStorageService.read(COLLECTIONS.USERS);
    res.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
};

export const saveUserData = async (req, res) => {
  try {
    const { userId, userName, userEmail } = req.body;
    const userData = await dataStorageService.create(COLLECTIONS.USERS, { id: userId, name: userName, email: userEmail });
    res.json({ success: true, message: 'User data saved', data: userData });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ success: false, message: 'Error saving user data' });
  }
};

export const saveDetectionArea = async (req, res) => {
  try {
    const { userId, detectionArea } = req.body;
    const savedArea = await dataStorageService.create(COLLECTIONS.DETECTION_AREAS, { userId, area: detectionArea });
    res.json({ success: true, message: 'Detection area saved', data: savedArea });
  } catch (error) {
    console.error('Error saving detection area:', error);
    res.status(500).json({ success: false, message: 'Error saving detection area' });
  }
};

export const getDetectionArea = async (req, res) => {
  try {
    const { userId } = req.params;
    const detectionArea = await dataStorageService.read(COLLECTIONS.DETECTION_AREAS, userId);
    if (detectionArea) {
      res.json(detectionArea);
    } else {
      res.status(404).json({ success: false, message: 'Detection area not found' });
    }
  } catch (error) {
    console.error('Error fetching detection area:', error);
    res.status(500).json({ success: false, message: 'Error fetching detection area' });
  }
};

export const incrementCount = async (req, res) => {
  try {
    const { itemId, incrementBy } = req.body;
    let item = await dataStorageService.read(COLLECTIONS.ITEMS, itemId);
    
    if (item) {
      item.count += incrementBy;
      await dataStorageService.update(COLLECTIONS.ITEMS, itemId, { count: item.count });
    } else {
      item = await dataStorageService.create(COLLECTIONS.ITEMS, { id: itemId, count: incrementBy });
    }
    
    res.json({ success: true, message: 'Count incremented', data: item });
  } catch (error) {
    console.error('Error incrementing count:', error);
    res.status(500).json({ success: false, message: 'Error incrementing count' });
  }
};