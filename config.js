const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raphzdiscord.firebaseio.com"
});

const db = admin.firestore();
const users = db.collection("users");

module.exports = users;