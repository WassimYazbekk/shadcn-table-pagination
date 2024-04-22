import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateUserForm } from "@/components/forms/create-user-form";
import http from "@/lib/axios-client-cashcade";
import { CreateUserParams } from "@/types/params";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const CreateUser: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const handleCreateUser = async (
    params: CreateUserParams,
  ): Promise<boolean> => {
    setLoading(true);
    let success = false;
    try {
      const response = await http.post("user", params);
      if (response.status === 201) {
        toast({ title: "Success", description: "User created successfully." });
        setLoading(false);
        success = true;
      }
    } catch (err: any) {
      if (isAxiosError(err) && err.response)
        toast({
          title: "Fail",
          variant: "destructive",
          description: err.response.data.error,
        });
      else
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Something went wrong!",
          action: (
            <ToastAction
              onClick={() => handleCreateUser(params)}
              altText="Try again"
            >
              Try again
            </ToastAction>
          ),
        });
      success = false;
    } finally {
      setLoading(false);
    }
    return success;
  };
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <Button className=" absolute top-0 left-1" variant={"ghost"}>
        <Link className="flex gap-2 items-center" to={"/cashcade"}>
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Creat a new Cashcade user.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm handleCreate={handleCreateUser} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateUser;
