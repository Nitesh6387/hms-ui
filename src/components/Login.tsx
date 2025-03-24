import React from 'react'
import Link from 'next/link'
const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" className="w-full mt-1 p-2 border rounded" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input type="password" className="w-full mt-1 p-2 border rounded" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account?
                    <Link href="/signup">
                        <span className="text-blue-600 hover:underline">Sign up here</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login