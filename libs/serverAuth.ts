// Импортируем необходимые модули из Next.js и NextAuth
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

// Импортируем клиент Prisma для операций с базой данных
import prisma from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest) => {
  // Используем NextAuth для получения сеанса пользователя из запроса
  const session = await getSession({ req });

  // Проверяем, существует ли сеанс пользователя и содержит ли он электронную почту
  if (!session?.user?.email) {
    throw new Error('Вы не зарегистрированы');
  }

  // Используем Prisma для запроса базы данных на наличие пользователя с электронной почтой из сеанса
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!currentUser) {
    throw new Error('Вы не зарегистрированы');
  }

  return { currentUser };
}

export default serverAuth;