import { engineLabsService } from '../services/engineLabsService';
import { COLLECTIONS } from '../config/enginelabs';

export const createTrainingData = async (data) => {
  try {
    const createdData = await engineLabsService.create(COLLECTIONS.ITEMS, { data });
    return createdData;
  } catch (error) {
    console.error('Error creating training data:', error);
    throw error;
  }
};

export const getAllTrainingData = async () => {
  try {
    const data = await engineLabsService.read(COLLECTIONS.ITEMS);
    return data;
  } catch (error) {
    console.error('Error getting all training data:', error);
    throw error;
  }
};

export const getTrainingDataById = async (id) => {
  try {
    const data = await engineLabsService.read(COLLECTIONS.ITEMS, id);
    return data;
  } catch (error) {
    console.error('Error getting training data by id:', error);
    throw error;
  }
};

export const updateTrainingData = async (id, data) => {
  try {
    const updatedData = await engineLabsService.update(COLLECTIONS.ITEMS, id, { data });
    return updatedData;
  } catch (error) {
    console.error('Error updating training data:', error);
    throw error;
  }
};

export const deleteTrainingData = async (id) => {
  try {
    await engineLabsService.delete(COLLECTIONS.ITEMS, id);
  } catch (error) {
    console.error('Error deleting training data:', error);
    throw error;
  }
};