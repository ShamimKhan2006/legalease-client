// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
//  import { jwt } from "better-auth/plugins";
// const client = new MongoClient(process.env.MONGODB_URL);

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL,
//   secret: process.env.BETTER_AUTH_SECRET,
//   emailAndPassword: { 
//     enabled: true, 
//   },
//   socialProviders: {
//     google: { 
//       clientId: process.env.GOOGLE_CLIENT_ID, 
//       clientSecret: process.env.GOOGLE_SECRET_KEY, 
//     }, 
//   }, 
//   database: mongodbAdapter(client.db("legalease")),
//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://legalease-client-kappa.vercel.app"
//   ],
//   user: {
//     additionalFields: {
//       role: {
//         default: "user"
//       }
//     }
//   },

//    session:{
//        cookieCache:{
//         maxAge:7*24*60*60,
//         strategy:"jwt",
//         enabled:true,
        
//        }
//    },
//  plugins:[
//   jwt()
//  ]
// });


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

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

  trustedOrigins: [
    "http://localhost:3000",
    "https://legalease-client-kappa.vercel.app"
  ],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user"
      }
    }
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },

  plugins: [jwt()]
});