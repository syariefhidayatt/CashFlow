"use client";

import Button from "./Button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Category, Transaction } from "../generated/prisma";
import { useRouter } from "next/navigation";
import createTransactionAction, {
  updateTransactionAction,
} from "../actions/transaction";

interface Props {
  categories: Category[];
  initialData?: Transaction | null;
}

export default function TransactionFormClient({
  categories,
  initialData,
}: Props) {
  const router = useRouter();

  const actionToUse = initialData
    ? updateTransactionAction.bind(null, initialData.id)
    : createTransactionAction;

  const [state, formAction, isPending] = useActionState(actionToUse, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);
  return (
    <form
      action={formAction}
      key={initialData ? initialData.amount && initialData.description : "baru"}
    >
      <label>Amount</label>
      <input type="number" name="amount" defaultValue={initialData?.amount} />
      <label>Desciption</label>
      <input
        type="text"
        name="description"
        defaultValue={initialData?.description}
      />
      <select name="categoryId" defaultValue={initialData?.categoryId}>
        <option value="">--Pilih Kategori--</option>
        {categories.map((cat) => (
          <option value={cat.id.toString()} key={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>
      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 text-sm mt-2">{state.success}</p>
      )}
      <Button variant="primary">
        {isPending
          ? "Menyimpan..."
          : initialData
            ? "Perbarui Transaksi"
            : "Tambah Transaksi"}
      </Button>
      <Link href="/dashboard">Kembali ke dashborad</Link>
    </form>
  );
}
