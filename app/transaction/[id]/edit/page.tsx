import TransactionFormClient from "@/app/components/TransactionFormClient";
import { getAuthenticatedUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transactionId = parseInt(id);

  const { user } = await getAuthenticatedUser();
  if (!user) redirect("/login");

  const trasaction = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });
  if (!trasaction || trasaction.userId !== user.id) redirect("/dashboard");

  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 w-full max-w-md rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl text-center font-bold mb-8">Edit Transaksi</h2>
        <TransactionFormClient
          categories={categories}
          initialData={trasaction}
        />
      </div>
    </main>
  );
}
