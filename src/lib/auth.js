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
        default: "user"
      }
    }
  },

   session:{
       cookieCache:{
        maxAge:7*24*60*60,
        strategy:"jwt",
        enabled:true,
        
       }
   },
 plugins:[
  jwt()
 ]
});


// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins";

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
//         type: "string",
//         defaultValue: "user"
//       }
//     }
//   },

//   session: {
//     cookieCache: {
//       enabled: true,
//       maxAge: 5 * 60
//     }
//   },

//   plugins: [jwt()]
// });




// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins";

// const client = new MongoClient(process.env.MONGODB_URL);
// const db = client.db("legalease");

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

//   database: mongodbAdapter(db),

//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://legalease-client-kappa.vercel.app"
//   ],

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         defaultValue: "user"
//       }
//     }
//   },

//   session: {
//     cookieCache: {
//       enabled: true,
//       maxAge: 5 * 60
//     }
//   },

//   // ✅ নতুন user register হলে automatically lawyersData-তে entry তৈরি করো
//   hooks: {
//     after: [
//       {
//         matcher: (context) => context.path === "/sign-up/email",
//         handler: async (context) => {
//           try {
//             const user = context.context?.newSession?.user;
//             if (!user) return;

//             if (user.role === "lawyer") {
//               const lawyersColl = db.collection("laywersData");
              
//               // Already আছে কিনা check করো
//               const existing = await lawyersColl.findOne({ email: user.email });
//               if (!existing) {
//                 await lawyersColl.insertOne({
//                   name: user.name,
//                   email: user.email,
//                   image: user.image || "",
//                   specialization: "",
//                   hourlyRate: 0,
//                   isBusy: false,
//                   bio: "",
//                   createdAt: new Date(),
//                 });
//                 console.log(`✅ lawyersData-তে entry তৈরি: ${user.email}`);
//               }
//             }
//           } catch (err) {
//             console.error("Hook error:", err.message);
//           }
//         }
//       }
//     ]
//   },

//   plugins: [jwt()]
// });