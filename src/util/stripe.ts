import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2020-03-02"
});

export default stripe;
