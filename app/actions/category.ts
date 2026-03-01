"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ActionState =
  | {
      error?: string;
      success?: string;
    }
  | null
  | undefined;

export default async function createCategoryAction(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const session = await auth();
    if (!session || !session.user?.email)
      return { error: "Anda harus login terlebih dahulu" };

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!currentUser)
      return {
        error: "Akun tidak valid atau telah dihapus. Silakan login ulang.",
      };

    const rawFormCategory = {
      categoryName: formData.get("categoryName") as string,
      categoryType: formData.get("categoryType") as string,
    };
    if (!rawFormCategory.categoryName || !rawFormCategory.categoryType)
      return {
        error: "Semua kolom wajib diisi",
      };

    const category = await prisma.category.create({
      data: {
        userId: currentUser.id,
        categoryName: rawFormCategory.categoryName,
        categoryType: rawFormCategory.categoryType as "INCOME" | "EXPENSE",
      },
    });
    revalidatePath("/dashboard");
    return { success: "Kategori berhasil ditambahkan" };
  } catch (err) {
    console.error(err);
    return { error: "Terjadi kesalahan pada sistem" };
  }
}
