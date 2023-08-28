"use client";

import UserItem from "@/components/UserItem";
import { User } from "@/typing";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  // new user
  const [newUser, setNewUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: {
      name: "",
    },
    address: {
      street: "",
    },
  } as User);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // adding new user
  const handleAddUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(newUser);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      console.log(response);

      if (response.ok) {
        const newUserWithId = { ...newUser, id: users.length + 1 };
        setUsers([...users, newUserWithId]);
        // reset new user
        setNewUser({
          name: "",
          username: "",
          email: "",
          phone: "",
          company: {
            name: "",
          },
          address: {
            street: "",
          },
        } as User);
      } else {
        console.error("Failed to add user");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      setIsModalOpen(false);
    }
  };

  return (
    <main className="bg-white h-full px-4">
      <div className="flex justify-between py-4 px-4 items-center">
        <h1 className="text-black font-bold">Users</h1>

        <button
          className="bg-green-600 rounded-md px-8 py-1 mt-2"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>

      {/* Modal for adding users */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2 className="text-black font-semibold mb-4">Add User</h2>
            <form
              onSubmit={handleAddUser}
              className="text-black flex flex-col gap-3 md:px-40"
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />
              <label htmlFor="name">Email:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                className="border-2 text-black border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                required
              />
              <label htmlFor="companyname">Company Name:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="companyname"
                value={newUser.company.name}
                onChange={(e) =>
                  setNewUser((prevUser) => ({
                    ...prevUser,
                    company: { ...prevUser.company, name: e.target.value },
                  }))
                }
                required
              />
              <label htmlFor="streetaddress">Street Address:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
                id="streetaddress"
                value={newUser.address.street}
                onChange={(e) =>
                  setNewUser((prevUser) => ({
                    ...prevUser,
                    address: { ...prevUser.address, street: e.target.value },
                  }))
                }
                required
              />

              <button
                className="bg-green-600 rounded-md px-8 py-1 text-white"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
