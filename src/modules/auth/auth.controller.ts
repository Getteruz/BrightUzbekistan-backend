import { Request, Response } from "express";
import { LoginDto } from "./dto";
import { authService } from "./auth.module";
import {
  accessTokenOptions,
  ACCESS_TOKEN_ADMIN,
  refreshTokenOptions,
  REFRESH_TOKEN_ADMIN,
} from "./constanta";

export const Login = async (req, res: Response) => {
  const accessToken = authService.getJWT("access", req.user.id);
  const refreshToken = authService.getJWT("refresh", req.user.id);
  res.cookie(ACCESS_TOKEN_ADMIN, accessToken, accessTokenOptions);
  res.cookie(REFRESH_TOKEN_ADMIN, refreshToken, refreshTokenOptions);
  try {
  } catch (err) {
    res.sendStatus(400).send(err.massage);
  }
};

export const Logout = async (_: Request, res: Response) => {
  res.clearCookie(ACCESS_TOKEN_ADMIN, accessTokenOptions);
  res.clearCookie(REFRESH_TOKEN_ADMIN, refreshTokenOptions);
};

export const Refresh = async (req, res: Response) => {
  const accessToken = authService.getJWT("access", req.user.id);
  const refreshToken = authService.getJWT("refresh", req.user.id);
  res.cookie(ACCESS_TOKEN_ADMIN, accessToken, accessTokenOptions);
  res.cookie(REFRESH_TOKEN_ADMIN, refreshToken, refreshTokenOptions);
  try {
  } catch (err) {
    res.sendStatus(400).send(err.massage);
  }
};