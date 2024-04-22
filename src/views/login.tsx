import { LoginForm } from "@/components/forms/login-form";
import { useAuthContext } from "@/contexts/auth-context-provider";
import http from "@/lib/axios-client-algorivex";
import { LoginParams } from "@/types/params";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const { setAdmin, admin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  console.log(admin);

  if (admin) return <Navigate to={"/"} />;

  const handleLogin = async (data: LoginParams) => {
    setLoading(true);
    try {
      await http.get("sanctum/csrf-cookie");
      await http.post("login", {
        email: data.email,
        password: data.password,
      });

      const response = await http.get("api/user");
      const adminData = await response.data;
      setAdmin({
        name: adminData.name,
        id: adminData.id,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[450px] border border-secondary  shadow-md rounded p-6">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-semibold">Login</h1>
        </div>
        <LoginForm loading={loading} handleLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
