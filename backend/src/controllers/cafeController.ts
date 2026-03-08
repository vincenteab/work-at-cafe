import { Request, Response } from "express";
import { getCafes, createCafe } from "../services/cafeService";

export async function listCafes(req: Request, res: Response) {
  const cafes = await getCafes();
  res.json(cafes);
}

export async function addCafes(req: Request, res: Response) {
  const cafe = await createCafe(req.body);
  res.status(201).json(cafe);
}
