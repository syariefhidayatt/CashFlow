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
    <div>
      <h2>Tambah Transaksi Baru</h2>
      <TransactionFormClient categories={categories} />
    </div>
  );
}
