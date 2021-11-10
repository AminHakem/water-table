require('dotenv').config()
const { initializeApp } = require('firebase/app');
const { getDatabase ,ref, get,child,set} = require('firebase/database');

// Set the configuration for your app
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId:process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      };

const fApp =initializeApp(firebaseConfig);
const db = getDatabase();

const dbRef = ref(db);




const getCities = async function (){
  ret = await get(child(dbRef, "/")).then((snapshot) => {
    return snapshot.val()
  }).catch(err=>{
    return err
  })
  return ret
}
const addCity = async function (index,body){
    await set(ref(db, '/'+index ), body).catch(err=>{
      throw err
    });
    return "OK"
}


module.exports = {
  addCity: addCity,
  getCities:getCities}