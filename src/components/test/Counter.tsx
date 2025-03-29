"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/Redux/slices/counterSlice";
// Counter component 
export default function Counter() {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    return (
        <div className="text-center my-5">
            <h2>Counter: {count}</h2>
            <button className="px-4 py-2 border mx-1 hover:bg-green-500 hover:text-white text-2xl" onClick={() => dispatch(increment())}>+</button>
            <button className="px-4 py-2 border mx-1 hover:bg-green-500 hover:text-white text-2xl" onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}