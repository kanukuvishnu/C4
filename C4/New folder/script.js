
//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAr6pOln5SqlSBmjqymfEpC-36gD_gu-Jc",
    authDomain: "bhagavadgita-15643.firebaseapp.com",
    databaseURL: "https://bhagavadgita-15643-default-rtdb.firebaseio.com",
    projectId: "bhagavadgita-15643",
    storageBucket: "bhagavadgita-15643.firebasestorage.app",
    messagingSenderId: "823353428315",
    appId: "1:823353428315:web:f3b01d168e6137ae49727e",
    measurementId: "G-0H4TB7QPP6"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
async function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
    const tranRef = ref(
      database,
      `Shloka-${shlokaNum}/Translations/${languageKey}`
    );
    const meaningRef1 = ref(database, `Shloka-${shlokaNum}/Meaning/${languageKey}`);
    const snapshot3 =await get(meaningRef1);
    if (snapshot3.exists()) {
      const meaningText1 = snapshot3.val();
      document.getElementById("meaning-box").innerHTML =`${meaningText1}`;
    } else {
      console.error("No text data found.");
    }
    get(tranRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          document.getElementById("shloka-box").innerHTML = snapshot.val();
        } else {
          console.log("No data found.");
        }
      })
      .catch((error) => {
        console.log("Error translating.", error);
      });
  }
  //----------------------/Database Integration End/-----------------------
  
  window.changeText = function (languageKey) {
    fetchTranslation(window.currentShlokaNum, languageKey);
  };
  
  //-----------------------------/Onclick functions/-----------------------------
  window.navClick = async function (shlokaNumber) {
    window.currentShlokaNum = shlokaNumber;
    const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);  
    const meaningRef = ref(database, `Shloka-${shlokaNumber}/meaning/2`);
   const audioRef = ref(database, `Shloka-${shlokaNumber}/audio`);
   const audio1Ref = ref(database, `Shloka-${shlokaNumber}/audiom`);
    
  
    const snapshot = await get(audioRef);
    const snapshot1 = await get(mainRef);  
    const snapshot2 = await get(meaningRef);
    
    const snapshot5 = await get(audio1Ref);
    
  
    if (snapshot2.exists()) {
      const meaningText = snapshot2.val();
      document.getElementById("meaning-box").innerHTML =`Meaning:${meaningText}`;
    } else {
      console.error("No text data found.");
    }
    if (snapshot5.exists()) {
      const audioUrl = snapshot5.val();
      document.getElementById("audPlayer1").src = audioUrl;
    } else {
      console.error("No audio data found.");
    }if (snapshot.exists()) {
      const audioUrl = snapshot.val();
      document.getElementById("audPlayer").src = audioUrl;
    } else {
      console.error("No audio data found.");
    }
    if (snapshot1.exists()) {
      const mainText = snapshot1.val();
      document.getElementById("shloka-box").innerHTML = mainText;
    } else {
      console.error("No text data found.");
    }
    
  };