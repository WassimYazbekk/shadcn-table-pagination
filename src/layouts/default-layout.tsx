import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted">
      <aside className="flex flex-col min-h-full w-72 fixed items-center justify-start bg-primary ">
        <h1 className="text-white text-xl font-semibold">Hello</h1>
      </aside>
      <main className="w-[calc(100vw-18rem)] flex ml-auto p-2 ">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
