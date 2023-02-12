import './App.css';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {getAuth, signInAnonymously} from "firebase/auth"
import {ToastContainer, toast} from 'react-toastify'
import app from './firebase'; 
import "react-toastify/dist/ReactToastify.css"
import React from 'react';
const analytics = getAnalytics(app);
function App() {
  const singUpAnonymously= ()=>{
    signInAnonymously(getAuth(app)).then(user=> console.log(user));
  }
 
const messaging = getMessaging(app);
const activateMessages = async() => {
  const token = await getToken(messaging, {
    vapidKey: "YOUR_VAPID_KEY"
  }).catch(error => console.log("error generatin token"))

  if (token) console.log("token", token);
  if (!token) console.log("no token")

}

React.useEffect(()=>{
  singUpAnonymously();
  activateMessages();
  onMessage(messaging, message=>{
    console.log("your message: ", message)
   
    toast(message.notification.title)
   // console.log("payload.data.url"+message.data.url)
//window.location.replace("http://localhost:3000/"+message.data.url)
  })


})




  return (
    <div>
    <h1>Firebase Cloud Messages</h1>
    <ToastContainer/>
    <button onClick={singUpAnonymously}>Log In</button>
    <button onClick={activateMessages}>Generate Token</button>
    </div>
  );
}

export default App;
