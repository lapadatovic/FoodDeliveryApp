// Saving new item

import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data) => {
    console.log('uso?')
    await setDoc(
        doc(firestore, 'foodItems', `${Date.now()}`),
        data, { merge: true });
};
