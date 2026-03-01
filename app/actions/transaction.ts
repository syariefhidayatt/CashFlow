"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helper";
import { redirect } from "next/navigation";

export type ActionState =
  | {
      error?: string;
      success?: string;
    }
  | null
  | undefined;

export default async function createTransactionAction(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const { error, user } = await getAuthenticatedUser();
    if (error || !user) return { error };

    const rawFormTransaction = {
      categoryId: parseInt(formData.get("categoryId") as string),
      amount: parseInt(formData.get("amount") as string),
      description: formData.get("description") as string,
    };
    if (!rawFormTransaction.amount || !rawFormTransaction.description)
      return {
        error: "Semua kolom wajib diisi",
      };

    const createNewTransaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: rawFormTransaction.categoryId,
        amount: rawFormTransaction.amount,
        description: rawFormTransaction.description,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Transaction berhasil ditambahkan" };
  } catch (err) {
    console.error(err);
    return { error: "Terjadi kesalahan pada sistem" };
  }
}

export async function deleteTransactionAction(
  transactionId: number,
  prevState: ActionState,
) {
  try {
    const { error, user } = await getAuthenticatedUser();
    if (error || !user) return { error };

    const currentTransaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (currentTransaction?.userId != user.id)
      return {
        error: "Akses ditolak",
      };

    const deleteTransaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Transaction berhasil dihapus" };
  } catch (err) {
    console.error(err);
    return { error: "Terjadi kesalahan pada sistem" };
  }
}

export async function updateTransactionAction(
  transactionId: number,
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const { error, user } = await getAuthenticatedUser();
    if (error || !user) return { error };

    const currentTransaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (currentTransaction?.userId != user.id)
      return {
        error: "Akses ditolak",
      };

    const rawFormTransaction = {
      categoryId: parseInt(formData.get("categoryId") as string),
      amount: parseInt(formData.get("amount") as string),
      description: formData.get("description") as string,
    };
    if (!rawFormTransaction.amount || !rawFormTransaction.description) {
      return { error: "Semua kolom wajib diisi" };
    }

    const updateTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        categoryId: rawFormTransaction.categoryId,
        amount: rawFormTransaction.amount,
        description: rawFormTransaction.description,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: "Terjadi kesalahan pada sistem" };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
