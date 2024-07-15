import { API_BASE_URL, COLLECTIONS, getHeaders } from '../config/api';
import { queueService } from './queueService';

class AnalyticsService {
  async trackEvent(event) {
    try {
      // Enqueue event tracking
      await queueService.enqueue('analytics-tracking', event);
      return { success: true, message: 'Event queued for tracking' };
    } catch (error) {
      console.error('Track event error:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      const response = await fetch(`${API_BASE_URL}/${COLLECTIONS.ANALYTICS}?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }

  async generateReport(reportType, parameters) {
    try {
      // Enqueue report generation
      const job = await queueService.enqueue('report-generation', { reportType, parameters });
      return { jobId: job.id, message: 'Report generation queued' };
    } catch (error) {
      console.error('Generate report error:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();