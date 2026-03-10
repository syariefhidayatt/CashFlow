"use server";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";

export type ActionState =
  | {
      error?: string;
      success?: string;
    }
  | null
  | undefined;

export default async function registerUserAction(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password || !name)
      return { error: "Semua kolom wajib diisi" };

    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });
    if (user) return { error: "email sudah terdaftar" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return { success: "Akun berhasil dibuat" };
  } catch (err) {
    console.error(err);
    return { error: "Gagal mendaftar" };
  }
}

export async function loginCredentialsAction(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau Password salah" };
        default:
          return { error: "Terjadi kesalahan pada sistem" };
      }
    }
    throw error;
  }
}

export async function loginUserActionProvider(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function logoutUserAction() {
  await signOut({ redirectTo: "/login" });
}
