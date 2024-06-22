import { z } from "zod"
// Login schema 
export const FormSchema = z.object({
    email: z.string().min(4, {
        message: "Username must be at least 2 characters.",
    }).email("This is not a valid email."),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
    })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
// Product add schema

export const CreateProductSchema = z.object({
    name: z.string()
        .trim()
        .min(4, { message: "Name must be at least 4 characters." })
        .max(12, { message: "Name cannot be more than 12 characters." }),
    description: z.string().trim()
        .min(12, { message: "Description must be at least 12 characters." })
        .max(50, { message: "Description cannot be more than 50 characters." }),
    price: z.string().trim(),
    category: z.string().trim(),
    availability: z.string().trim(),
    image: z
        .any(),
        stock : z.string()
        .trim().min(1,{ message: "stock is required." })
});

