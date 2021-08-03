import { Request, Response, NextFunction } from "express";

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

const userController = {
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await req.context.dataSources.users.getOneById(req.params.userId);
  
      if (!user) {
        throw req.context.error.http(404);
      }
  
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
