'use client';

import React, { useState } from 'react';
import Sidebar from '../sidebar'

interface Order {
  id: string;
  name: string;
  date: string;
  price: string;
  status: string;
  filterType: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleFilter = (type: string) => setFilter(type);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.toLowerCase());
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedDate(e.target.value);

  const filteredOrders = orders.filter(
    (order: Order) =>
      (!filter || order.filterType === filter) &&
      (!search || order.status.toLowerCase().includes(search))
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-100 mt-26">
      <Sidebar />
      <div className="p-6 w-full ml-64">
      <h2 className="text-2xl font-semibold mb-5">My Orders</h2>

        <div className="flex justify-between items-center my-4">
          <div className="flex gap-4 text-[#00A5CF]">
            <button onClick={() => handleFilter('today')} className=" font-medium cursor-pointer text-lg">
              Today
            </button>
            <button onClick={() => handleFilter('monthly')} className="font-medium cursor-pointer text-lg text-[#003F5C]">
              Monthly
            </button>
            <button onClick={() => handleFilter('yearly')} className="font-medium cursor-pointer text-lg text-[#003F5C]">
              Yearly
            </button>
          </div>
          <input type="text" className="border p-2 rounded-lg font-medium text-lg text-[#003F5C]" placeholder="Search by status" onChange={handleSearch} />
        </div>

        <table className="w-full bg-white shadow-lg rounded-lg text-left ">
          <thead>
            <tr className="bg-gray-200  font-bold text-lg">
              <th className="p-3">Order ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order: Order) => (
              <tr key={order.id} className="border-t font-normal text-base">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">${order.price}</td>
                <td className="p-3">
                  <span className="bg-[#FFB74D] px-2 py-1 rounded text-[#ffffff]">{order.status}</span>
                </td>
                <td className="p-3 w-1/6">
                    <button className="border p-2 rounded bg-[#00A5CF] text-white transition duration-200 cursor-pointer">
                      Download
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Dummy data for props
const dummyOrders: Order[] = [
  { id: '24092', name: 'Arabic For Beginners', date: 'March 31, 2025', price: '64.98', status: 'On Hold', filterType: 'monthly' },
  { id: '24086', name: 'Freelance Content Writing', date: 'March 31, 2025', price: '74.99', status: 'On Hold', filterType: 'monthly' },
  { id: '24072', name: 'New Course', date: 'March 31, 2025', price: '87.98', status: 'On Hold', filterType: 'monthly' },
  { id: '24092', name: 'Arabic For Beginners', date: 'March 31, 2025', price: '64.98', status: 'On Hold', filterType: 'monthly' },
  { id: '24086', name: 'Freelance Content Writing', date: 'March 31, 2025', price: '74.99', status: 'On Hold', filterType: 'monthly' },
  { id: '24072', name: 'New Course', date: 'March 31, 2025', price: '87.98', status: 'On Hold', filterType: 'monthly' },
];

export default function OrderPage() {
  return <OrderHistory orders={dummyOrders} />;
}
