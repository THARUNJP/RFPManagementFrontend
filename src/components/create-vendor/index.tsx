
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVendor } from "../../service/vendor.service";
import { createVendorSchema, type CreateVendorForm } from "../../validator";

export default function CreateVendor() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateVendorForm>({
    resolver: zodResolver(createVendorSchema),
  });

  const onSubmit = async (data: CreateVendorForm) => {
    try {
      setLoading(true);
      const res = await createVendor(data);

      alert("Vendor created successfully!");

      reset();
    } catch (error) {
      alert("Failed to create vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Vendor
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="Vendor Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("contact_email")}
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="email@example.com"
            />
            {errors.contact_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact_email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="Phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Vendor"}
          </button>
        </form>
      </div>
    </div>
  );
}
