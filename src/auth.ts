
// auth.ts
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

// Function to save user info in Firestore
export const saveUser = (uid: string, data: any) => {
  return setDoc(doc(db, "users", uid), data);
};

// Function to sign up a user and save extra info
export const signUpUser = async (email: string, password: string, name: string, role: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Save extra info in Firestore
    await saveUser(result.user.uid, {
      name: name,
      email: email,
      role: role
    });

    console.log("User signed up and saved successfully!");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
