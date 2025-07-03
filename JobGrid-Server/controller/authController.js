import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        provider: 'local',
        providerId: null
      }
    });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "User already exists with this email." });
    }
    res.status(400).json({ error: "Unable to register user", err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Unable to login", err });
  }
};
