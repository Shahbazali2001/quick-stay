import stripe from "stripe";

export const stripeWebhooks = async(req, res)=>{
    // Stripe Getway Initialized
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];
    let event;
    try{
        event = stripeInstance.webhooks.constructEvent(req.boy, signature, process.env.STRIPE_WEBHOOK_SECRET);
    }catch(error){
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
}