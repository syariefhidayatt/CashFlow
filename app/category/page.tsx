"use client";
import createCategoryAction from "../actions/category";
import { useActionState } from "react";

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null,
  );

  return (
    <form action={formAction}>
      <label htmlFor="">Nama Kategori</label>
      <input type="text" name="categoryName" />
      <label htmlFor="">Tipe Kategori</label>
      <select name="categoryType" id="categoryType">
        <option value="INCOME">INCOME</option>
        <option value="EXPENSE">EXPENSE</option>
      </select>
      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 text-sm mt-2">{state.success}</p>
      )}
      <button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Tambah Kategori"}
      </button>
    </form>
  );
}
