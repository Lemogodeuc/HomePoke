import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type DotEnv = string | undefined;

type User = {
  id: number;
  firstname: string;
  lastname: string;
  password?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

const saltRounds: DotEnv = process.env["SALT_ROUNDS"];
const jwtSecret: DotEnv = process.env["JWT_SECRET"];

const userController = {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log("[email password] ", email, password);
      if (!saltRounds || !jwtSecret) {
        throw new Error("saltRounds or jwtSecret environment variable is undefined");
      }
      console.log("[saltRounds] ", saltRounds);
      const pass = await bcrypt.hash(password, +saltRounds);
      console.log("[pass] ", pass);
      const user: User = await req.context.dataSources.users.geteOneByEmail(email);
      console.log("[user] ", user);
      const match = user?.password ? await bcrypt.compare(password, user.password) : null;
      console.log("[match] ", match);

      if (!user || !match) {
        throw req.context.error.http(400);
      }
      delete user.password;
      const token = jwt.sign({ user }, jwtSecret, { expiresIn: "1h" });
      console.log("login", { user, token });
      res.json(token);
    } catch (error) {
      next(error);
    }
  },

  async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      console.log("[userData] ", userData);

      const checkUser: User = await req.context.dataSources.users.geteOneByEmail(userData.email);
      console.log("[checkUser] ", checkUser);

      if (checkUser) {
        throw req.context.error.http(409);
      }
      if (!saltRounds || !jwtSecret) {
        throw new Error("saltRounds or jwtSecret environment variable is undefined");
      }

      console.log("checkUser", checkUser);

      userData.password = bcrypt.hashSync(userData.password, +saltRounds);
      const user: User = await req.context.dataSources.users.createOne(userData);
      console.log("user", user);
      if (!user) {
        throw req.context.error.http(404);
      }
      const token = jwt.sign({ user }, jwtSecret, { expiresIn: "1h" });
      console.log("register", { token });
      res.json(token);
    } catch (error) {
      console.log("[error] ", error);
      next(error);
    }
  },

  async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await req.context.dataSources.users.updateOne(req.params.userId);

      if (!user) {
        throw req.context.error.http(404);
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

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
