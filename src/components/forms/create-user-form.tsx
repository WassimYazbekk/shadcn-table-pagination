import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserParams } from "@/types/params";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 characters at least." }),
  firstName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "First name is required." }),
  middleName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Middle name is required." }),
  lastName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Last name is required." }),
  address: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Address is required." }),
  phone: z
    .string()
    .trim()
    .toLowerCase()
    .min(8, { message: "Phone number is required." })
    .max(8, { message: "Phone number must be 8 digits." }),
});

interface Props {
  handleCreate: (args: CreateUserParams) => Promise<boolean>;
  loading: boolean;
}

export function CreateUserForm(props: Props) {
  const { handleCreate, loading } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const success = await handleCreate({
      username: values.username,
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
    });
    if (success) form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full ">
          Submit
        </Button>
      </form>
    </Form>
  );
}
