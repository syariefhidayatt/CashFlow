import { auth } from "@/auth";
import { prisma } from "./prisma";

export async function getAuthenticatedUser() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return { error: "Anda harus login terlebih dahulu", user: null };
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return {
      error: "Akun tidak valid atau dihapus. Silahkan login ulang",
      user: null,
    };
  }

  return { error: null, user: currentUser };
}
