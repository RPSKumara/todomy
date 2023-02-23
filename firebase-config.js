import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import Swal from "sweetalert2";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-y9xZSfh_KNi0ee4XtqRymu7N66ClemQ",
    authDomain: "todomy49.firebaseapp.com",
    projectId: "todomy49",
    storageBucket: "todomy49.appspot.com",
    messagingSenderId: "67805508909",
    appId: "1:67805508909:web:0b5e1e4a16ac1155608fa4",
    measurementId: "G-B0CBM51PVR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        customAlert(`${err.message}`, "error");
    }
};

const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", `${email}`), {
            uid: user.uid,
            userType: "Basic",
            //Basic , Standard , Premium
            m_email: email,
        })            
    } catch (err) {
        customAlert(`${err.message}`, "error");
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("password reset");
    } catch (err) {
        customAlert(`This email haven't account`, "error");
    }
};

const logout = () => {
    signOut(auth);
};

const customAlert = (name, type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: type,
        title: name,
    });
};
export {
    db,
    storage,
    auth,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    customAlert,
};
