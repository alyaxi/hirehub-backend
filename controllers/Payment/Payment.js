const Payment = require("../../models/Payment/Payment");
const uuid = require("uuid");

const paymentController = {
  async PaymentCreation(req, res) {
    const {employerId} = req.user.id
    try {
      const payment = await Payment.create({
        paymentId: uuid.v4(), 
        amount: 0,
        plans: "Basic Plan",
        employerId,
        status: "Active",
      });
      return payment;
    } catch (error) {
      console.log(error);
    }
  },
};
