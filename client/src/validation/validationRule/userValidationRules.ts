import { z } from "zod";
import {
  getAtLeastMessage,
  getMaxLengthMessage,
  getMinLengthMessage,
} from "../generalValidationMessage";

const userValidationRules = {
  Email: z.string().trim().email("Invalid email"),
  Password: z
    .string()
    .min(8, getMinLengthMessage("Password", 8))
    .max(100, getMaxLengthMessage("Password", 100))
    .regex(/[a-z]/, {
      message: getAtLeastMessage("Password", 1, "lowercase letter"),
    })
    .regex(/[A-Z]/, getAtLeastMessage("Password", 1, "uppercase letter"))
    .regex(/\d/, getAtLeastMessage("Password", 1, "number"))
    .regex(/[\W_]/, getAtLeastMessage("Password", 1, "special character")),
  Username: z
    .string()
    .min(3, getMinLengthMessage("Username", 3))
    .max(20, getMaxLengthMessage("Username", 20))
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
} as const;

export default userValidationRules;