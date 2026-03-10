import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteTransactionButton from "../components/DeleteTransactionButton";
import Link from "next/link";
import DashboardChart from "../components/DashboardChart";
import { logoutUserAction } from "../actions/auth";
import Button from "../components/Button";

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
    <main className="container max-w-5xl mx-auto p-6 ">
      <div className="flex justify-between pb-4">
        <h1 className="font-bold text-xl">
          Dashboard Keuangan, {currentUser.name}
        </h1>
        <form action={logoutUserAction}>
          <Button type="submit" variant="danger">
            Logout
          </Button>
        </form>
      </div>
      <section className="bg-mauve-200 rounded-xl shadow p-6 mb-6">
        <h3 className="text-center text-gray-800 font-semibold text-xl">
          Analisis Saldo
        </h3>
        <DashboardChart income={totalIncome} expense={totalExpense} />
      </section>
      <div className="flex justify-between items-end mb-2">
        <h3 className="font-bold">Riwayat Transaksi Terbaru</h3>
        <Link
          href="/transaction"
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md font-semibold "
        >
          + Tambah Transaksi
        </Link>
      </div>

      <section className="bg-mauve-200 rounded-xl shadow">
        <div
          className={`font-bold p-2 border-b-2 rounded-xl ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          <h2>Total Saldo: {formatRupiah(balance)}</h2>
        </div>

        <ul className="divide-y divide-taupe-400">
          {transaction.map((trx) => (
            <li
              key={trx.id}
              className="p-6 flex justify-between items-center hover:bg-mauve-300 rounded-xl "
            >
              <div>
                <p className="font-semibold text-gray-800">{trx.description}</p>
                <span
                  className={`font-bold text-sm bg-indigo-200 px-2 py-1 rounded ${trx.category.categoryType === "INCOME" ? "text-green-600" : "text-red-600"}`}
                >
                  {trx.category.categoryName}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-bold ${trx.category.categoryType === "INCOME" ? "text-green-600" : "text-red-600"}`}
                >
                  {trx.category.categoryType === "INCOME" ? "+" : "-"}
                  {formatRupiah(trx.amount)}
                </span>

                <Link
                  href={`/transaction/${trx.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md font-semibold "
                >
                  Edit
                </Link>
                <DeleteTransactionButton transactionId={trx.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
