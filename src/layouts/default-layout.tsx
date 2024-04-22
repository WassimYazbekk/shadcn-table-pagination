import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context-provider";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, Navigate, Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
  const { admin, setAdmin } = useAuthContext();

  if (!admin) return <Navigate to={"/login"} />;

  const logout = () => {
    setAdmin(null);
    return <Navigate to={"/login"} />;
  };

  return (
    <div className="flex min-h-screen w-full bg-muted">
      <aside className="flex flex-col min-h-full w-72 fixed items-center justify-start bg-primary ">
        <div className="flex w-full items-center justify-between p-2 h-16 bg-blue-500 rounded-b ">
          <h1 className="text-white text-xl font-semibold">{admin?.name}</h1>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="text-white hover:text-destructive transition-colors rounded p-2"
                  onClick={logout}
                >
                  <ExitIcon height={22} width={22} />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                onClick={logout}
                className="bg-destructive"
                side="right"
              >
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className=" flex flex-col w-full items-center p-2 justify-start  space-y-2">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              [
                isActive
                  ? "bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-800",
                "flex w-full justify-start p-4 rounded text-xl font-semibold transition-colors text-white",
              ].join(" ")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/cashcade"}
            className={({ isActive }) =>
              [
                isActive
                  ? "bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-800",
                "flex w-full justify-start p-4 rounded text-xl font-semibold transition-colors text-white",
              ].join(" ")
            }
          >
            Cashcade
          </NavLink>
          <NavLink
            to={"/users"}
            className={({ isActive }) =>
              [
                isActive ? "bg-blue-800 " : "bg-blue-500 hover:bg-blue-800",
                "flex w-full justify-start p-4 rounded text-xl font-semibold transition-colors text-white",
              ].join(" ")
            }
          >
            Users
          </NavLink>
        </div>
        <div className="flex-1"></div>
        <h1 className="text-lg text-white p-2">
          &copy; Algorivex {new Date(Date.now()).getFullYear()}
        </h1>
      </aside>
      <main className="w-[calc(100vw-18rem)] flex ml-auto p-2 ">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
