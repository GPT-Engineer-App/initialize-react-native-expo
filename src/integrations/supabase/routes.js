import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

// Route to improve TensorFlow model
export const improveModel = async (screenshot, metadata) => {
  try {
    const { data, error } = await supabase
      .from('model_improvement_requests')
      .insert({ screenshot, metadata });

    if (error) throw error;

    console.log('Screenshot:', screenshot);
    console.log('Metadata:', metadata);

    return { success: true, message: 'Model improvement request received' };
  } catch (error) {
    console.error('Error improving model:', error);
    throw new Error('Error improving model');
  }
};

// Route to fetch user data
export const getUserData = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
};

// Route to save user data
export const saveUserData = async (userId, userName, userEmail) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({ id: userId, name: userName, email: userEmail });

    if (error) throw error;

    return { success: true, message: 'User data saved' };
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('Error saving user data');
  }
};

// Route to save detection area
export const saveDetectionArea = async (userId, detectionArea) => {
  try {
    const { data, error } = await supabase
      .from('detection_areas')
      .upsert({ user_id: userId, area: detectionArea });

    if (error) throw error;

    return { success: true, message: 'Detection area saved' };
  } catch (error) {
    console.error('Error saving detection area:', error);
    throw new Error('Error saving detection area');
  }
};

// Route to fetch detection area
export const getDetectionArea = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('detection_areas')
      .select('area')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No detection area found
      }
      throw error;
    }

    return data.area;
  } catch (error) {
    console.error('Error fetching detection area:', error);
    throw new Error('Error fetching detection area');
  }
};

// Route to increment detection count
export const incrementCount = async (itemId, incrementBy) => {
  try {
    const { data, error } = await supabase.rpc('increment_item_count', {
      p_item_id: itemId,
      p_increment: incrementBy
    });

    if (error) throw error;

    return { success: true, message: 'Count incremented' };
  } catch (error) {
    console.error('Error incrementing count:', error);
    throw new Error('Error incrementing count');
  }
};