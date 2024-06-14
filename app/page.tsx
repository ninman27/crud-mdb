"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users", {
        cache: "no-store",
      });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: any) => {
    const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to delete user!");
    }
    window.location.reload();
  };

  return (
    <div>
      {users.map((user: any) => {
        return (
          <div key={user._id}>
            {user.user} {user.db}
            <button onClick={() => handleDelete(user._id)}>Delete user</button>
            <Link href={`/update-user/${user._id}`}>
              <button>Update user</button>
            </Link>
          </div>
        );
      })}
      <Link href="/create-user">
        <button>Create user</button>
      </Link>
    </div>
  );
};

export default Home;
