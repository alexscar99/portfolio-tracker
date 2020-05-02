import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const allUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  try {
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
