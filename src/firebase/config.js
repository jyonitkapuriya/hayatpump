// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, where, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCqQBufv4iglFbsx_62P6QbvkeOMaPLuE",
    authDomain: "hayat-pumps.firebaseapp.com",
    projectId: "hayat-pumps",
    storageBucket: "hayat-pumps.appspot.com",
    messagingSenderId: "791551308044",
    appId: "1:791551308044:web:4462407f08bc1d63541929",
    measurementId: "G-LDYQKFPTZ5"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const useAuth = getAuth;
export const storage = getStorage;
const Firestore = getFirestore();

export const loginWithPassword = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const uploadPumpImage = (image) => {
    console.log("image", image)
    if (!image) {
        console.log('No image selected');
        return Promise.resolve(null);
    }
    const storage = getStorage();
    const storageRef = ref(storage, 'pumps');
    return uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        return getDownloadURL(snapshot.ref);
    }).catch((err) => {
        console.log("err", err);
        return null;
    });
};

export const addPums = async (name, downloadURL) => {
    try {
        const docRef = await addDoc(collection(Firestore, 'products'), {
            name: name,
            imageUrl: downloadURL,
            type: "pump"
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export const getPums = async (name, downloadURL) => {
    try {
        const collectionRef = collection(Firestore, 'products');
        const q = query(collectionRef, where("type", "==", "pump"));
        const res = await getDocs(q);
        const data = res.docs.map((item) => ({ id: item.id, ...item.data() }))
        return data;
    } catch (e) {
        console.error('Error getting documents: ', e);
        throw e; // Rethrow the error to propagate it to the caller
    }
};

export const updatePump = async (docId, newData) => {
    try {
        const docRef = doc(Firestore, 'products', docId);
        await updateDoc(docRef, newData);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
};

export const deletePump = async (docId) => {
    try {
        const docRef = doc(Firestore, 'products', docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully');
    } catch (e) {
        console.error('Error deleting document: ', e);
        throw e;
    }
};