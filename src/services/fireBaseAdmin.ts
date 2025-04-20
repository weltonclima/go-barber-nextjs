
import * as admin from "firebase-admin";

if (!admin.apps?.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.farebaseio.com`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  });
  admin.firestore().settings({
    ignoreUndefinedProperties: true
  });

}

export default admin.firestore();