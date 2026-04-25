import { z } from "zod";

const PaginationValidationRule = {
  search: z.string().default(""),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .default(1),
  size: z
    .string()
    .transform((val) => parseInt(val))
    .default(10),
} as const;

export default PaginationValidationRule;