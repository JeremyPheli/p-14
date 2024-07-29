import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Stack, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CurrentEmployees = () => {
  const employees = useSelector((state) => state.employees);
  const data = useMemo(() => employees, [employees]);
  console.log(data);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor("firstName", {
      header: "First Name",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString() : "",
      footer: (info) => info.column.id,
      sortingFn: 'datetime',
    }),
    columnHelper.accessor("startDate", {
      header: "Start Date",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString() : "",
      footer: (info) => info.column.id,
      sortingFn: 'datetime',
    }),
    columnHelper.accessor("Street", {
      header: "Street",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
    columnHelper.accessor("City", {
      header: "City",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
    columnHelper.accessor("selectedState", {
      header: "State",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
    columnHelper.accessor("zip", {
      header: "Zip",
      footer: (info) => info.column.id,
      sortingFn: 'basic',
    }),
  ], [columnHelper]);

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Stack>
      <h1>Liste des employés</h1>
      <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    borderBottom: '1px solid black',
                    borderRight: '1px solid black',
                    cursor: 'pointer',
                    padding: '8px',
                    textAlign: 'left'
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼'}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{ border: '1px solid black', padding: '8px' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Précédent
        </Button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Suivant
        </Button>
      </div>
      <Box display={"flex"} alignItems={"flex-end"} justifyContent={"center"} mt={45}>
        <Link to="/">Home</Link>
      </Box>
    </Stack>
  );
};

export default CurrentEmployees;
