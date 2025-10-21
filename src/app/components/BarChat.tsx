"use client"
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
type Book = {
  id:number;
  name:string;
  price:string;
  description:string;
}
const data = [
  { name: "Apples", quantity: 400 },
  { name: "Bananas", quantity: 300 },
  { name: "Mangoes", quantity: 200 },
  { name: "Pineapples", quantity: 100 },
  { name: "Green Pepper", quantity: 150},
  { name: "Red Pepper", quantity:120},
  { name: "Yellow Pepper", quantity:130},
  { name: "Green Apples", quantity:200},
  { name: "Strawberry", quantity:230},
  { name: "Pear", quantity:250},
]

const COLORS = ["#32CD32", "#FFD700", "#FF8C00", "#00CED1"]

export default function DashboardCharts() {
  return (
    <div style={{marginTop:70}} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6  rounded-2xl w-full max-w-5xl mx-auto">
      
      {/* --- Pie / Donut Chart --- */}
      <div className="bg-white p-4 rounded-xl ">
        <h2 className="text-center font-semibold text-gray-700 mb-4">
          Inventory Distribution
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="quantity"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Bar Chart --- */}
      <div className="bg-white p-4 rounded-xl ">
        <h2 className="text-center font-semibold text-gray-700 mb-4">
          Inventory Quantity
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#32CD32" barSize={50} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}
