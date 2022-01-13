import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    const data = req.body;

    const { email, password } = data;

    // 確認信箱和密碼不為空，密碼至少要6位數
    if (!email || !password || password.trim().length < 6) {
        return res.status(422).json({ message: '信箱或密碼無效，密碼至少需要6位數' });
    }

    // 確認信箱有沒有被註冊了
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return res.status(422).json({ message: '信箱已經註冊過了' });
    }

    // 雜湊密碼
    const hashedPassword = await hash(password, 12);

    const result = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    res.status(201).json(result);
}