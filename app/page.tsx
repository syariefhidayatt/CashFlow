import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Selamat datang di Cash Flow</h1>
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-500 px-3 py-1 rounded ">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
