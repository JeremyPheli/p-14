import React, { useContext, useMemo } from "react";
import { EmployeeContext } from "../context/context";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import "../styles/index.css";
import { Box, Stack } from "@mui/material";

const CurrentEmployees = () => {
  const { employees } = useContext(EmployeeContext);

  const data = useMemo(() => employees, [employees]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dateOfBirth", {
      header: () => "Date of Birth",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString() : "",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("startDate", {
      header: () => "Start Date",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString() : "",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("Street", {
      header: "Street",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("City", {
      header: "City",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("selectedState", {
      header: "Selected State",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("zip", {
      header: "zip",
      footer: (info) => info.column.id,
    }),
  ];

  // const columns = useMemo(
  //   () => [
  //     {
  //       id: "firstName",
  //       accessorKey: "firstName",
  //       header: "First Name",
  //     },
  //     {
  //       id: "lastName",
  //       accessorKey: "lastName",
  //       header: "Last Name",
  //     },
  //     {
  //       id: "dateOfBirth",
  //       accessorKey: "dateOfBirth",
  //       header: "Date of Birth",
  //       cell: ({ getValue }) =>
  //         getValue() ? new Date(getValue()).toLocaleDateString() : "",
  //     },
  //     {
  //       id: "startDate",
  //       accessorKey: "startDate",
  //       header: "Start Date",
  //       cell: ({ getValue }) =>
  //         getValue() ? new Date(getValue()).toLocaleDateString() : "",
  //     },
  //     {
  //       id: "Street",
  //       accessorKey: "Street",
  //       header: "Street",
  //     },
  //     {
  //       id: "City",
  //       accessorKey: "City",
  //       header: "City",
  //     },
  //     {
  //       id: "selectedState",
  //       accessorKey: "selectedState",
  //       header: "State",
  //     },
  //     {
  //       id: "Zip",
  //       accessorKey: "Zip",
  //       header: "Zip",
  //     },
  //   ],
  //   []
  // );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack>
      <h1>Liste des employés</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Box
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        mt={45}
      >
        <Link to="/">Home</Link>
      </Box>
    </Stack>
  );
};

export default CurrentEmployees;
