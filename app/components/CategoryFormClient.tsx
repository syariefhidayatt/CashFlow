"use client";
import createCategoryAction from "../actions/category";
import { useActionState } from "react";
import Button from "../components/Button";
import Input from "./Input";

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null,
  );

  return (
    <form action={formAction}>
      <Input label="Category Name" name="categoryName" />
      <label className="flex mb-2 col-span-2 content-end text-sm font-medium text-slate-300 ">
        Category Type
      </label>
      <select
        name="categoryType"
        id="categoryType"
        className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
        <option value="INCOME">INCOME</option>
        <option value="EXPENSE">EXPENSE</option>
      </select>
      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 text-sm mt-2">{state.success}</p>
      )}
      <Button
        variant="primary"
        type="submit"
        disabled={isPending}
        className="flex gap-4 mt-6"
      >
        {isPending ? "Menyimpan..." : "Tambah Kategori"}
      </Button>
    </form>
  );
}
