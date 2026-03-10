"use client";

import { useActionState } from "react";
import { deleteTransactionAction } from "../actions/transaction";
import Button from "./Button";

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
      <Button variant="danger">{isPending ? "Menghapus..." : "Hapus"}</Button>
      {state?.error && (
        <span className="text-red-500 text-xs">{state.error}</span>
      )}
    </form>
  );
}
