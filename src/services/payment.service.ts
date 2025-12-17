import { FedaPay, Transaction } from 'fedapay';

export class PaymentService {
  constructor() {
    FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY as string);
    FedaPay.setEnvironment(
      (process.env.FEDAPAY_ENV  as string) || "live",
    );
  }

  async initiatePayment(data: {
    amount: number;
    phone: string;
    method: string;
    country?: string;
  }) {
    const transaction = await Transaction.create({
      description: 'Paiement mobile',
      amount: data.amount,
      currency: { iso: 'XOF' },
      mode: data.method,

      customer: {
        phone_number: {
          number: data.phone,
          country: data.country || 'BJ'
        }
      }
    });
    
    await transaction.sendNow(data.method)

    return {
      transaction_id: transaction.id,
      status: transaction.status
    };
  }



  async verifyPayment(transactionId: number) {
    const transaction = await Transaction.retrieve(transactionId);

    return {
      transaction_id: transaction.id,
      status: transaction.status,
      amount: transaction.amount,
      currency: transaction.currency?.iso
    };
  }
}
