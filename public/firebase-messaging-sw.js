importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey : "AIzaSyCxRmzLAl1BcqwemxsdOWJo0rtJLnOiDY0",
  authDomain: "react-chatapp-d1639.firebaseapp.com",
  projectId: "react-chatapp-d1639",
  storageBucket: "react-chatapp-d1639.appspot.com",
  messagingSenderId: "68250438401",
  appId: "1:68250438401:web:03a2ea77a9543e28572900",
  measurementId: "G-351T4SXT6Y"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});