import { collection, addDoc, query, getDocs, updateDoc, deleteDoc, doc , where} from "firebase/firestore";
import { auth,db } from "../firebase";

// Fungsi untuk menambahkan task ke Firestore
export const addTaskToFirestore = async (task) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        return { id: docRef.id, ...task };
    } catch (error) {
        console.error("Error adding task: ", error);
        throw error;
    }
};

export const getAllTasks = async () => {
    const user =auth.currentUser;
    if(!user) return [];

    try {
        const q = query(collection(db, "tasks"), where("userID", "==", user.uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const updateTaskInFirestore = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedTask);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw error;
    }
};

export const deleteTaskFromFirestore = async (taskId) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
};



