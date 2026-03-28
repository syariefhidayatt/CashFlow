import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TransactionFormClient from "../components/TransactionFormClient";

export default async function TransactionPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!currentUser) {
    return <h2>Error: Akun tidak valid.</h2>;
  }

  const categories = await prisma.category.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 w-full max-w-md rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tambah Transaksi Baru
        </h2>
        <TransactionFormClient categories={categories} />
      </div>
    </main>
  );
}


