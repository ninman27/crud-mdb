"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const UpdateUser = ({ params }: any) => {
  const router = useRouter();

  const [user, setUser] = useState({ user: "", db: "" });
  const { id } = params;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  const handleChange = (event: any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.user, db: user.db }),
    });
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          defaultValue={user?.user}
          onChange={handleChange}
        />
        <input
          type="text"
          name="db"
          defaultValue={user?.db}
          onChange={handleChange}
        />
        <button type="submit">Update user</button>
      </form>
    </div>
  );
};

export default UpdateUser;
