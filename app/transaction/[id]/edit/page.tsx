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
    <main>
      <h2>Edit Transaksi</h2>
      <TransactionFormClient categories={categories} initialData={trasaction} />
    </main>
  );
}
