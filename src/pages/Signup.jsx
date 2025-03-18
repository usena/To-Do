import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import NavbarComponent from "../components/NavbarComponent";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
      toast.error("No field can be blank!");
      return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user)

        if(user){
          await setDoc(doc(db,"Users",user.uid),{
            email:user.email,
            firstName:firstName,
            lastName:lastName,
          });
        }

        console.log("updated successfully");
        toast.success("Signup success!");
        navigate("/");     

    } catch (error) {
        console.log("Error:", error);
        toast.error("Signup failed! Try again.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg text-blue-800 font-semibold mb-4">
          Create a new account!
        </h1>
        <form className="flex flex-col gap-3 w-80" onSubmit={handleEmailSignup}>
            <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        <span className="my-4 text-sm font-bold text-grey-600">
          Already have an account?
          <NavLink to="/signin" className="text-blue-800 hover:underline ml-1">Signin</NavLink>
        </span>
      </div>
    </>
  );
};

export default Signup;
