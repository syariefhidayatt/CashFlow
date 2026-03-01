"use client";

import { useActionState } from "react";
import { deleteTransactionAction } from "../actions/transaction";

interface Props {
  transactionId: number;
}

export default function DeleteTransactionButton({ transactionId }: Props) {
  const deleteActionWithId = deleteTransactionAction.bind(null, transactionId);
  const [state, formAction, isPending] = useActionState(
    deleteActionWithId,
    null,
  );
  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending} className="">
        {isPending ? "Menghapus..." : "Hapus"}
      </button>
      {state?.error && (
        <span className="text-red-500 text-xs">{state.error}</span>
      )}
    </form>
  );
}
