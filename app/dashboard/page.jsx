import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Users } from "@/components/users";
import SignOutButton from "@/components/SignOutButton";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Server session</h2>
      <prev>{JSON.stringify(session, null, 2)}</prev>
      <h2>Client session</h2>
      <Users />
      <SignOutButton />
    </div>
  );
}
