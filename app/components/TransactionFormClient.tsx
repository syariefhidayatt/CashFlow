"use client";

import { useActionState } from "react";
import createTransactionAction, {
  updateTransactionAction,
} from "../actions/transaction";
import { Category, Transaction } from "../generated/prisma";

interface Props {
  categories: Category[];
  initialData?: Transaction | null;
}

export default function TransactionFormClient({
  categories,
  initialData,
}: Props) {
  const actionToUse = initialData
    ? updateTransactionAction.bind(null, initialData.id)
    : createTransactionAction;

  const [state, formAction, isPending] = useActionState(
    createTransactionAction,
    null,
  );

  return (
    <form action={formAction}>
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
      <button type="submit" disabled={isPending}>
        {isPending
          ? "Menyimpan..."
          : initialData
            ? "Perbarui Transaksi"
            : "Tambah Transaksi"}
      </button>
    </form>
  );
}
