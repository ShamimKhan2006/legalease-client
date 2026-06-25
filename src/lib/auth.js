import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db("legalease");

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOGGLE_CLIENT_ID, 
            clientSecret: process.env.GOGGLE_SECRET_KEY, 
        }, 
    }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  user:{
    additionalFields:{
      role:{
        default:"user"
      }
    }
  }
});