import { Request, Response } from 'express';
import responseCodes from '../responseCodes';
import usersService from '../services/usersService';
import { IUpdateUser, INewUser } from '../interfaces/usersInterface';

const usersController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.user.id) || (res.locals.user.role === 'Admin')) {
      const user = await usersService.getUserById(id);
      if (!user) {
        return res.status(responseCodes.badRequest).json({
          error: `No user found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      user,
    });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'No permission',
    });
  },
  removeUser: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    await usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({});
  },
  createUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, password, email,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: 'Password is required',
      });
    }
    const newUser: INewUser = {
      firstName,
      lastName,
      password,
      email,
      role: 'User',
    };
    const id = await usersService.createUser(newUser);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUser: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, password, role,
    } = req.body;
    const isAdmin = res.locals.user.role === 'Admin';
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName && !email && !password && !role) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    const updateUser: IUpdateUser = {
      id,
    };
    if (firstName) updateUser.firstName = firstName;
    if (lastName) updateUser.lastName = lastName;
    if (email) updateUser.email = email;
    if (password) updateUser.password = password;
    if (role && isAdmin) updateUser.role = role === 'Admin' ? 'Admin' : 'User';
    const result = await usersService.updateUser(updateUser);
    if (!result) {
      res.status(responseCodes.notFound).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default usersController;
