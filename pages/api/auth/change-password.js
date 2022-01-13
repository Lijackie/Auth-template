import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({ message: "未登入" });
  }

  const userEmail = session.user.email;
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  if (password1 !== password2) {
    return res.status(404).json({ message: "密碼不同" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "無此信箱" });
  }

  const hashedPassword = await hash(password1, 12);

  const result = await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      password: hashedPassword,
    },
  });

  res.status(200).json({ message: "密碼修改成功!" });
}
