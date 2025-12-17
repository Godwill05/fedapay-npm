import { Router } from 'express';
import { initiatePayment, verifyPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/pay', initiatePayment);
router.get("/verify/:transactionId", verifyPayment);

export default router;
