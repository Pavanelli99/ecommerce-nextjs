import { connectDB } from '@/configs/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/user-model";
import bcrypt from 'bcryptjs';

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, email, password } = await req.json();
    const userExist = await User.findOne({email});

    if(userExist){
      throw new Error('User  already exists')
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();


    return NextResponse.json({
      success: true,
      message: 'user created!',
      data: { name, email, password },
    });
  } catch (error: any) { //any para o que não tem tipo
    return NextResponse.json({
      success: false,
      message: error.message,

    },
    {

      status: 404,

    });
  }
}
