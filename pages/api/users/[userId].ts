import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Неправильный ID')
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    const folowersCount = await prisma.user.count({
      where: {
        folowingIds: {
          has: userId
        }
      }
    })

    return res.status(200).json({ ...existingUser, folowersCount });
    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

export default handler;