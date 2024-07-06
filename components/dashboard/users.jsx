"use client";

import { useSession } from "next-auth/react";

export const Users = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Users</h1>
      <prev>Session: {JSON.stringify(session, null, 2)}</prev>
    </div>
  );
};
