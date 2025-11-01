// services/paymentService.ts
import axios from 'axios';
import { Payment } from '../types';

// Your Google Apps Script URL for payments only
const API_URL = 'https://script.google.com/macros/s/AKfycbyRuQfarzyHaeetAYXaULYZAAaLhjjFGOtxlmPDc8gVzdmGR-Lxz4eiOc3LusNmYKdEBw/exec';

export const paymentService = {
  generatePaymentReference: (): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 9);
    return `pay_${timestamp}_${randomString}`;
  },

  createPayment: async (paymentData: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> => {
    try {
      const reference = paymentService.generatePaymentReference();
      const paymentWithId = {
        ...paymentData,
        id: reference,
        transactionId: reference, // Use reference as initial transaction ID
      };
      
      const response = await axios.post(`${API_URL}/payments`, paymentWithId);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment');
    }
  },

  updatePaymentAfterSuccess: async (reference: string, updateData: {
    status: 'completed' | 'failed';
    transactionId: string;
    paystackReference: string;
    authorizationCode?: string;
  }): Promise<Payment> => {
    try {
      // For Google Apps Script, the webhook will handle the actual update
      // We just return the updated data for the frontend
      const updatedPayment: Payment = {
        id: reference,
        laptopId: '',
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        amount: 0,
        paymentType: 'Full',
        transactionId: updateData.transactionId,
        status: updateData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return updatedPayment;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw new Error('Failed to update payment');
    }
  },

  getPaymentByReference: async (reference: string): Promise<Payment | null> => {
    try {
      const response = await axios.get(`${API_URL}/payments/${reference}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      return null;
    }
  }
};