import User from "../models/User";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) =>{
    try{
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await webhook.verify(JSON.stringify(req.body), headers);

        const {data, type } = req.body;

        const userData = {
            _id : data.id,
            email : data.email_addresses[0].email_address,
            username : data.first_name + " " + data.last_name,
            image : data.image_url,
        };

        switch(type){
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        res.status(200).json({sucess : true, message : "User Webhook Received"});

    }catch(error){
        console.log(error);
        res.status(500).json({sucess : false, message : "Internal Server Error"});
    }
}

export default clerkWebhooks;