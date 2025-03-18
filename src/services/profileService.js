import { getDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const getProfile = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data(); // Return user profile data
        } else {
            console.log("User profile does not exist");
            return null;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const updateProfileInFirestore = async (profileId, updatedProfile) => {
    try {
        const profileRef = doc(db, "Users", profileId);
        await updateDoc(profileRef, updatedProfile);
    } catch (error) {
        console.error("Error updating profile: ", error);
        throw error;
    }
};