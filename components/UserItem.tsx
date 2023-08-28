"use client";

import { User } from "@/typing";
import React from "react";

interface Props {
  user: User;
}

export default function UserItem({ user }: Props) {
  return (
    <div className="p-4 bg-blue-400 rounded-md">
      <p>
        Name: {user.name} @{user.username}
      </p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
      <p>
        Address: {user.address.street}, {user.address.city}
      </p>
      <div className="flex justify-between">
        <button className="bg-yellow-500 rounded-md px-8 py-1 mt-2">
          Edit
        </button>
        <button className="bg-red-600 rounded-md px-8 py-1 mt-2">Delete</button>
      </div>
    </div>
  );
}
