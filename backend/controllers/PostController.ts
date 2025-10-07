import prisma from "../prisma/client";
import { Request, Response } from "express";

const findPost = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                image: true,
                title: true,
                content: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.status(200).send({
            success: true,
            message: "Get all posts successfully",
            data: posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

export { findPost };
