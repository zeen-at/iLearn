import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBTLV0tgL1Pxwck7XB_Fx6Vof788_Xx-Ng",
	authDomain: "mynewapp-302d7.firebaseapp.com",
	projectId: "mynewapp-302d7",
	storageBucket: "mynewapp-302d7.appspot.com",
	messagingSenderId: "668303989927",
	appId: "1:668303989927:web:b0ef267895794ad86fcf82",
};

export const app =
	getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const storage = getStorage(app);
