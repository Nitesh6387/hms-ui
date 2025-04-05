"use client";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/Redux/slices/authSlice";
import { useEffect } from "react";
// Authentication component 
export default function Auth() {
    const user = useSelector((state: any) => state.auth.session);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(user);
        
    },[user])
    return (
        <div className="text-center">
             {user!=null ? (
                <>
                    <h2>Welcome, {user}</h2>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </>
            ) : (
                <button className="px-6 py-1 rounded-md border mx-1 hover:bg-green-500 hover:text-white font-semibold"  onClick={() => dispatch(login("John Doe"))}>Login</button>
            )}
        </div>
    );
} 