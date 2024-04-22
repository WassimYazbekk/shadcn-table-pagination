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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginParams } from "@/types/params";

const formSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .trim()
    .min(1, {
      message: "password must be at least 8 character.",
    })
    .max(32, {
      message: "Maximum password length is 32 characters.",
    }),
});

interface Props {
  handleLogin: (args: LoginParams) => Promise<void>;
  loading: boolean;
}

export function LoginForm(props: Props) {
  const { handleLogin, loading } = props;
  const [hidden, setHidden] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleLogin({
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1 ">
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={hidden ? "password" : "text"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <div
                  onClick={() => setHidden((prev) => !prev)}
                  className=" absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {hidden ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full ">
          Login
        </Button>
      </form>
    </Form>
  );
}
