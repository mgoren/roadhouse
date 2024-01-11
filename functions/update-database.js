'use strict';

import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

const serviceAccount = functions.config().database.service_account;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
const ordersRef = db.ref('orders');

ordersRef.get().then((snapshot) => {
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      const firstPerson = childData.people[0];
      console.log(`${childData.Id}, ${firstPerson.first} ${firstPerson.last}, ${childData.emailConfirmation}, ${childData.electronicPaymentId}`);
    });
  } else {
    console.log("No data available");
  }
  admin.app().delete();
}).catch((error) => {
  console.error(error);
});
