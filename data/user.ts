import { db } from "@/lib/db";
import exp from "constants";
import { get } from "http";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw new Error("Could not fetch user");
  }
};
