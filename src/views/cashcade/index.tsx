import AppStatusCard from "@/components/cashcade/app-status-card";
import { columns as userColumns } from "@/components/cashcade/users/columns";
import { columns as logColumns } from "@/components/cashcade/logs/columns";
import { DataTable } from "@/components/cashcade/users/data-table";
import http from "@/lib/axios-client-cashcade";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Cashcade: React.FC = () => {
  const [usersPage, setUsersPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [usersSearchQuery, setUsersSearchQuery] = useState("");
  const [logsPage, setLogsPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const [logsSearchQuery, setLogsSearchQuery] = useState("");
  const [errorsPage, setErrorsPage] = useState(1);
  const [errorsPerPage, setErrorsPerPage] = useState(10);
  const [errorsSearchQuery, setErrorsSearchQuery] = useState("");

  const fetchUsers = async (
    page: number = 1,
    rows: number = 10,
    query: string = "",
  ) => {
    try {
      const res = await http.get("users", {
        params: {
          page: page,
          perPage: rows,
          query: query,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const fetchLogs = async (
    page: number = 1,
    rows: number = 10,
    query: string = "",
  ) => {
    try {
      const res = await http.get("logs", {
        params: {
          page: page,
          perPage: rows,
          query: query,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const fetchErrors = async (
    page: number = 1,
    rows: number = 10,
    query: string = "",
  ) => {
    try {
      const res = await http.get("errors", {
        params: {
          page: page,
          perPage: rows,
          query: query,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const usersQuery = useQuery({
    queryKey: ["cashcade", "users", usersPage, usersPerPage, usersSearchQuery],
    queryFn: () => fetchUsers(usersPage, usersPerPage, usersSearchQuery),
    placeholderData: keepPreviousData,
  });

  const logsQuery = useQuery({
    queryKey: ["cashcade", "logs", logsPage, logsPerPage, logsSearchQuery],
    queryFn: () => fetchLogs(logsPage, logsPerPage, logsSearchQuery),
    placeholderData: keepPreviousData,
  });

  const errorsQuery = useQuery({
    queryKey: [
      "cashcade",
      "errors",
      errorsPage,
      errorsPerPage,
      errorsSearchQuery,
    ],
    queryFn: () => fetchErrors(errorsPage, errorsPerPage, errorsSearchQuery),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <AppStatusCard />
      <div>
        {usersQuery.isLoading ? (
          "loading..."
        ) : usersQuery.isError ? (
          "something went wrong..."
        ) : (
          <DataTable
            data={usersQuery.data.data}
            columns={userColumns}
            pagesCount={usersQuery.data.meta.last_page}
            rowsPerPage={usersQuery.data.meta.per_page}
            setRowsPerPage={setUsersPerPage}
            query={usersSearchQuery}
            createRowLink="/cashcade/users/create"
            title="Users Table"
            totalRows={usersQuery.data.meta.total}
            hiddenColumns={{
              phone: false,
              address: false,
              createdAt: false,
              updatedAt: false,
            }}
            setQuery={setUsersSearchQuery}
            currentPage={usersQuery.data.meta.current_page}
            setPage={setUsersPage}
          />
        )}
      </div>
      <div>
        {logsQuery.isLoading ? (
          "loading..."
        ) : logsQuery.isError ? (
          "something went wrong..."
        ) : (
          <DataTable
            data={logsQuery.data.data}
            columns={logColumns}
            pagesCount={logsQuery.data.meta.last_page}
            rowsPerPage={logsQuery.data.meta.per_page}
            setRowsPerPage={setLogsPerPage}
            query={logsSearchQuery}
            title="Logs Table"
            totalRows={logsQuery.data.meta.total}
            hiddenColumns={{
              updatedAt: false,
            }}
            setQuery={setLogsSearchQuery}
            currentPage={logsQuery.data.meta.current_page}
            setPage={setLogsPage}
          />
        )}
      </div>
      <div>
        {errorsQuery.isLoading ? (
          "loading..."
        ) : errorsQuery.isError ? (
          "something went wrong..."
        ) : (
          <DataTable
            data={errorsQuery.data.data}
            columns={logColumns}
            pagesCount={errorsQuery.data.meta.last_page}
            rowsPerPage={errorsQuery.data.meta.per_page}
            setRowsPerPage={setErrorsPerPage}
            query={errorsSearchQuery}
            title="Errors Table"
            totalRows={errorsQuery.data.meta.total}
            hiddenColumns={{
              updatedAt: false,
            }}
            setQuery={setErrorsSearchQuery}
            currentPage={errorsQuery.data.meta.current_page}
            setPage={setErrorsPage}
          />
        )}
      </div>
    </div>
  );
};

export default Cashcade;
