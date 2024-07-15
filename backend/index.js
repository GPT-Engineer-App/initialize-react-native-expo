import { app, Datastore } from 'codehooks-js';
import { bodyParser } from 'codehooks-js/bodyParser';

const datastore = new Datastore();

// Use bodyParser to handle JSON requests
app.use(bodyParser.json());

// Route to improve TensorFlow model
app.post('/improveModel', async (req, res) => {
  try {
    const { screenshot, metadata } = req.body;
    // Placeholder: Implement logic to improve the TensorFlow model with provided data
    console.log('Screenshot:', screenshot);
    console.log('Metadata:', metadata);
    // Simulate model improvement
    res.status(200).send('Model improved');
  } catch (error) {
    console.error('Error improving model:', error);
    res.status(500).send('Error improving model');
  }
});

// Route to fetch user data
app.get('/userData', async (req, res) => {
  try {
    const users = await datastore.getMany('users');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
});

// Route to save detection area
app.post('/saveDetectionArea', async (req, res) => {
  try {
    const { userId, detectionArea } = req.body;
    await datastore.put('detectionAreas', { userId, detectionArea });
    res.status(200).send('Detection area saved');
  } catch (error) {
    console.error('Error saving detection area:', error);
    res.status(500).send('Error saving detection area');
  }
});

// Route to fetch detection area
app.get('/getDetectionArea/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const detectionArea = await datastore.get('detectionAreas', userId);
    if (detectionArea) {
      res.status(200).json(detectionArea);
    } else {
      res.status(404).send('Detection area not found');
    }
  } catch (error) {
    console.error('Error fetching detection area:', error);
    res.status(500).send('Error fetching detection area');
  }
});

// Route to increment detection count
app.post('/incrementCount', async (req, res) => {
  try {
    const { itemId, incrementBy } = req.body;
    let item = await datastore.get('items', itemId);
    if (item) {
      item.count = (item.count || 0) + incrementBy;
      await datastore.put('items', item);
    } else {
      await datastore.put('items', { id: itemId, count: incrementBy });
    }
    res.status(200).send('Count incremented');
  } catch (error) {
    console.error('Error incrementing count:', error);
    res.status(500).send('Error incrementing count');
  }
});

export default app;