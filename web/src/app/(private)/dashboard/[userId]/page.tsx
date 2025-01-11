import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBase } from "@/actions/base.action";

export default async function Page() {
  const token = (await cookies()).get("firebase_token")?.value;
  if (!token) {
    redirect("/auth");
  }
  const response = await getBase();
  console.log(response.message);

  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}
