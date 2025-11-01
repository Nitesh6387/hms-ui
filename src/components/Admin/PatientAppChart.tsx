"use client"
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { date: 'Apr 1', patients: 20 },
    { date: 'Apr 2', patients: 30 },
    { date: 'Apr 3', patients: 10 },
    { date: 'Apr 4', patients: 40 },
    { date: 'Apr 5', patients: 35 },
];

export default function PatientAppChart() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-96">
            <h2 className="text-xl font-semibold mb-4">Patient Appointments (Last 5 Days)</h2>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="patients" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
