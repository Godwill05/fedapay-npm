import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const paymentService = new PaymentService();

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { amount, phone, method, country } = req.body;

    const result = await paymentService.initiatePayment({
      amount,
      phone,
      method,
      country
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }

    


    const result = await paymentService.verifyPayment(Number(transactionId));

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



