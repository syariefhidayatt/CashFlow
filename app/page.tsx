import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteTransactionButton from "@/app/components/DeleteTransactionButton";
import Link from "next/link";

export default async function Dashboard() {
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

  const transaction = await prisma.transaction.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      category: true,
    },
  });

  const totalIncome = transaction
    .filter((trx) => trx.category.categoryType === "INCOME")
    .reduce((total, trx) => total + trx.amount, 0);

  const totalExpense = transaction
    .filter((trx) => trx.category.categoryType === "EXPENSE")
    .reduce((total, trx) => total + trx.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <main>
      <h1>Selamat datang, {session.user?.name}</h1>
      <div className="flex gap-4">
        <h2>Total Saldo: {formatRupiah(balance)}</h2>
        <div>
          <h3>Riwayat Transaksi Terbaru</h3>
          <Link
            href="/transaction"
            className="bg-blue-500 text-white px-3 py-1 rounded inline-block mb-4"
          >
            + Tambah Transaksi
          </Link>
          <ul>
            {transaction.map((trx) => (
              <li key={trx.id}>
                {trx.description} | {trx.category.categoryName} |{" "}
                {formatRupiah(trx.amount)}
                <Link
                  href={`/transaction/${trx.id}/edit`}
                  className="bg-yellow-500 text-white px-2 py-1 mx-2 rounded text-sm"
                >
                  Edit
                </Link>
                <DeleteTransactionButton transactionId={trx.id} />
              </li>
            ))}
          </ul>
        </div>
        <p>Total Pemasukan: {formatRupiah(totalIncome)}</p>
        <p>Total Pengeluaran: {formatRupiah(totalExpense)}</p>
      </div>
    </main>
  );
}
