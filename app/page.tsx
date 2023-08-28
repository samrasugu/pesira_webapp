"use client";

import UserItem from "@/components/UserItem";
import { User } from "@/typing";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <main className="bg-white h-full px-4">
      <div className="flex justify-between py-4 px-4 items-center">
        <h1 className="text-black font-bold">Users</h1>

        <button className="bg-green-600 rounded-md px-8 py-1 mt-2">
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
