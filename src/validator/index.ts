import z from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact_email: z.email("Invalid email format"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
});

export type CreateVendorForm = z.infer<typeof createVendorSchema>;
