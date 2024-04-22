import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export type ReactFCWithChildren = {
  children: React.ReactNode;
};

export type CashcadeHeaderCards = {
  usersCount: number;
  logsCount: number;
  errosCount: number;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagesCount: number;
  rowsPerPage: 10 | 20 | 30 | 40 | 50;
  currentPage: number;
  hiddenColumns?: VisibilityState;
  title: string;
  createRowLink?: string;
  totalRows: number;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}
