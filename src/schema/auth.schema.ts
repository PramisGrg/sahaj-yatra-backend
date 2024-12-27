import { z } from "zod";

const userRegisterSchema = z.object({
  username: z.string().min(2, { message: "Enter a valid username" }),
  email: z.string().email({ message: "Enter a valid email" }),
  citizenshipNumber: z
    .string()
    .min(2, { message: "Enter a valid citizenship number" }),
  phoneNumber: z.string().min(2, { message: "Enter a valid phone number" }),
  password: z.string().min(3, { message: "Enter a valid password" }),
});

export { userRegisterSchema };
