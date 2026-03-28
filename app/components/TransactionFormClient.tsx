"use client";

import Button from "./Button";
import { useActionState, useEffect, useState } from "react";
import { Category, Transaction } from "../generated/prisma";
import { useRouter } from "next/navigation";
import createTransactionAction, {
  updateTransactionAction,
} from "../actions/transaction";
import Input from "./Input";
import { GenericModal } from "./Modal";
import CategoryForm from "./CategoryFormClient";

interface Props {
  categories: Category[];
  initialData?: Transaction | null;
}

export default function TransactionFormClient({
  categories,
  initialData,
}: Props) {
  const [IsCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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
    <>
      <form
        action={formAction}
        key={
          initialData ? initialData.amount && initialData.description : "baru"
        }
      >
        <Input
          label="Amount"
          name="amount"
          id="amount"
          type="number"
          defaultValue={initialData?.amount}
        />
        <Input
          label="Description"
          name="description"
          id="description"
          type="text"
          defaultValue={initialData?.description}
        />

        <div className="grid grid-cols-3 gap-1.5 mb-4">
          <label className="col-span-2 content-end text-sm font-medium text-slate-300">
            Category
          </label>

          <div className="col-span-1 justify-self-end-safe">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md font-semibold"
            >
              + Category
            </button>
          </div>

          <select
            name="categoryId"
            defaultValue={initialData?.categoryId}
            className="col-span-3 bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option>--Select Category--</option>
            {categories.map((cat) => (
              <option value={cat.id.toString()} key={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {state?.error && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-sm mt-2">{state.success}</p>
        )}
        <Button variant="primary" className="w-full">
          {isPending
            ? "Menyimpan..."
            : initialData
              ? "Perbarui Transaksi"
              : "Tambah Transaksi"}
        </Button>
      </form>

      <GenericModal
        isOpen={IsCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      >
        <h3 className="text-xl font-bold text-white mb-6">
          Buat Kategori Baru
        </h3>
        <CategoryForm />
      </GenericModal>
    </>
  );
}
