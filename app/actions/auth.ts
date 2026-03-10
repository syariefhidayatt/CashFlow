"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function registerUserAction(formData: FormData) {
  const rawFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  if (!rawFormData.username || !rawFormData.email || !rawFormData.password)
    return console.log("data tidak boleh kosong");

  const user = await prisma.user.findUnique({
    where: { email: rawFormData.email as string },
  });
  if (user) return console.log("email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: rawFormData.username,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });
  redirect("/login");
}

export async function loginUserAction(formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  await signIn("credentials", {
    email: rawFormData.email,
    password: rawFormData.password,
    redirectTo: "/dashboard",
  });
}

export async function loginUserActionProvider(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function logoutUserAction() {
  await signOut({ redirectTo: "/login" });
}
