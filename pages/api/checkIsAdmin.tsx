import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authToken = req.cookies["auth-token"];

    if (!authToken) {
        return res.status(200).json(false);
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/checkRole`,
            {},
            {
                withCredentials: true,
                headers: {
                    Cookie: `auth-token=${authToken}`,
                },
            }
        );
        if (response.data.role === "admin") {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        console.error("Error checking role:", error);
        res.status(500).json(false);
    }
}