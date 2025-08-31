import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCyLPPe7xt_HxRS-mNrJZ0Xp9m2_56Siz8",
  authDomain: "netflix-clone-be485.firebaseapp.com",
  projectId: "netflix-clone-be485",
  storageBucket: "netflix-clone-be485.firebasestorage.app",
  messagingSenderId: "891938067570",
  appId: "1:891938067570:web:b96b609c981284c54a1eeb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("User signed up:", user);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully!");
  } catch (error) {
    console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
     signOut(auth);
    
}

export { auth, db, signup, login, logout };
