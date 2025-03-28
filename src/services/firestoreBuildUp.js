import { db } from "./firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

// Function to create Firestore's writeBetter document
export const buildStructure_WriteBetter = async (uid = "USER_IDENTITY"
                                                ,year = "YYYY"
                                                ,date = "MM-dd"
                                                ,title = "ESSAY_UNIQUE_IDENTITY"
                                                ,data = {
                                                    title: "USER_ESSAY_TITLE"
                                                    ,content: "DEFAULT_STRUCTURE_USER_ESSAY_CONTENT_GOES_HERE"
                                                    ,time: "2025-03-25 14:25:00"
                                                    ,timeZone: "UTC-6"
                                                    ,totoalWords: "28"
                                                }
                                            ) => {
  try {
    const docRef = doc(db, "writeBetter", uid, year, date);
    await setDoc(docRef, {title : {data}});
    console.log("Writing data added successfully!");
  } catch (error) {
    console.error("Error adding writing data:", error);
  }
};

// Function to create user profile
export const buildStructure_UserProfile = async (uid = "USER_IDENTITY"
                                                ,userData = {
                                                    personal_info:{
                                                        name: "ADMIN"
                                                        ,email: "ADMIN@MAIL.COM"
                                                    }
                                                    ,personal_preference: {
                                                        theme: "DEFAULT"
                                                        ,fontSize: "MEDIUM"
                                                    }
                                                    ,sys_user_info: {
                                                        accountCreated: "YYYY-MM-ddT00:00:00"
                                                        ,lastLogin: "YYYY-MM-ddT00:00:00"
                                                    }
                                                }
                                            ) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { "user-info": userData });
    console.log("User profile created successfully!");
  } catch (error) {
    console.error("Error adding user profile:", error);
  }
};

// Function to set system-wide settings
export const buildStructure_SystemConfig = async (app = "app_writeBetter"
                                                ,configData = {
                                                    version: "v1"
                                                    ,maintenance: FALSE
                                                }
                                            ) => {
  try {
    const docRef = doc(db, "system", app);
    await setDoc(docRef, configData);
    console.log("System settings updated!");
  } catch (error) {
    console.error("Error updating system settings:", error);
  }
};
