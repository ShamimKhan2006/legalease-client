import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

// await সরিয়ে দিন - mongodbAdapter নিজেই connection handle করে
export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_SECRET_KEY, 
    }, 
  }, 
  database: mongodbAdapter(client.db("legalease")),
  user: {
    additionalFields: {
      role: {
        default: "user"
      }
    }
  }
});