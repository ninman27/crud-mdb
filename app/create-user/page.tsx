"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateUser = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    user: "",
    db: "",
  });
  
  const handleChange = (event: any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.user, db: user.db }),
    });

    if (response.ok) {
      setUser({
        user: "",
        db: ",",
      });

      router.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={user.user}
          onChange={handleChange}
        />
        <input
          type="text"
          name="db"
          placeholder="DB"
          value={user.db}
          onChange={handleChange}
        />
        <button type="submit">Create new user</button>
      </form>
    </div>
  );
};

export default CreateUser;
