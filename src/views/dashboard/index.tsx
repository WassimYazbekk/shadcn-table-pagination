import { DataTable } from "@/components/dashboard/data-table";
import { columns as userColumns } from "@/components/dashboard/users/columns";
import { getUsers } from "@/lib/getUsers";
import { useEffect, useState } from "react";

export interface IUser {
  id: number | bigint;
  username: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phoneNumber: string;
  address: string;
  access: number;
  createdAt: number;
  updatedAt: number;
}

export interface IResponse<T> {
  data: T[];
  meta: IResponseMetaData;
}

export interface IResponseMetaData {
  page: number;
  perPage: 10 | 20 | 30 | 40 | 50;
  total: number;
  totalPages: number;
}

const Dashboard: React.FC = () => {
  // store query params in url better than useState
  // i used useState for easier implementation
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");

  // use Tanstack query instead of use effect and useState
  // to fetch and store request data.
  // i used this approach to make the example easier to
  // implement and test on your machine
  const [data, setData] = useState<IResponse<IUser>>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(page, perPage, query);
      setData(response);
    };
    fetchUsers();
  }, [page, perPage, query]);

  return (
    <div className="w-full h-full">
      {data ? (
        <DataTable
          data={data.data}
          columns={userColumns}
          pagesCount={data.meta.totalPages}
          rowsPerPage={data.meta.perPage}
          setRowsPerPage={setPerPage}
          query={query}
          title="Users Table"
          totalRows={data.meta.total}
          hiddenColumns={{
            phoneNumber: false,
            address: false,
            createdAt: false,
            updatedAt: false,
          }}
          setQuery={setQuery}
          currentPage={data.meta.page}
          setPage={setPage}
        />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Dashboard;
