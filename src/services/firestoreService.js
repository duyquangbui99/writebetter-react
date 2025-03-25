import { db } from "./firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

// Function to create user's first writing document
export const addWritingData = async (uid, year, date, title, contentData) => {
  try {
    const docRef = doc(db, "writeBetter", uid, year, date);
    await setDoc(docRef, {title : {contentData}});
    console.log("Writing data added successfully!");
  } catch (error) {
    console.error("Error adding writing data:", error);
  }
};

// Function to create user profile
export const addUserProfile = async (uid, userData) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { "user-info": userData });
    console.log("User profile created successfully!");
  } catch (error) {
    console.error("Error adding user profile:", error);
  }
};

// Function to set system-wide settings
export const setSystemConfig = async (configData) => {
  try {
    const docRef = doc(db, "system", "app_writeBetter");
    await setDoc(docRef, configData);
    console.log("System settings updated!");
  } catch (error) {
    console.error("Error updating system settings:", error);
  }
};
