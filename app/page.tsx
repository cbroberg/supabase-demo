import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./auth/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Hello World</h1>
        <p className="mb-6 text-gray-600 text-sm break-all">{user.email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}
