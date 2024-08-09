import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Stack,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CurrentEmployees = () => {
  const employeesObject = useSelector((state) => state.employees);
  const [employees, setEmployees] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (employeesObject && typeof employeesObject === "object") {
      const employeesArray = Object.values(employeesObject);
      setEmployees(employeesArray);
      setIsLoaded(true);
    }
  }, [employeesObject]);

  const filteredData = useMemo(() => {
    const filtered =
      searchTerm === ""
        ? employees.filter(
            (employee) =>
              employee && employee.firstName && Object.keys(employee).length > 0
          )
        : employees.filter((employee) => {
            if (
              !employee ||
              !employee.firstName ||
              Object.keys(employee).length === 0
            )
              return false;
            return Object.values(employee).some((value) => {
              return (
                value !== null &&
                value !== undefined &&
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
            });
          });

    return filtered;
  }, [employees, searchTerm]);

  const data = useMemo(() => filteredData, [filteredData]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: "First Name",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
      columnHelper.accessor("lastName", {
        header: "Last Name",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
      columnHelper.accessor("dateOfBirth", {
        header: "Date of Birth",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleDateString() : "",
        footer: (info) => info.column.id,
        sortingFn: "datetime",
      }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleDateString() : "",
        footer: (info) => info.column.id,
        sortingFn: "datetime",
      }),
      columnHelper.accessor("Street", {
        header: "Street",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
      columnHelper.accessor("City", {
        header: "City",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
      columnHelper.accessor("selectedState", {
        header: "State",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
      columnHelper.accessor("Zip", {
        header: "Zip",
        footer: (info) => info.column.id,
        sortingFn: "basic",
      }),
    ],
    [columnHelper]
  );

  const handleSorting = (columnId) => {
    setSorting((currentSorting) => {
      if (currentSorting.length === 0) {
        return [{ id: columnId, desc: false }];
      }

      if (currentSorting[0].id !== columnId) {
        return [{ id: columnId, desc: false }];
      }

      if (currentSorting[0].desc === false) {
        return [{ id: columnId, desc: true }];
      }

      return [{ id: columnId, desc: false }];
    });
  };

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize }));
  }, [pageSize]);

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
      {isLoaded ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            marginBottom={2}
            justifyContent={"space-between"}
            padding={"0 10px"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography>Rechercher : </Typography>
              <TextField
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  marginRight: "16px",
                  height: "34px",
                }}
                InputProps={{
                  style: {
                    height: "34px",
                  },
                }}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography>Afficher</Typography>
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                variant="outlined"
                style={{ maxWidth: "70px", maxHeight: "30px" }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
              <Typography>lignes</Typography>
            </Box>
          </Box>
          <table
            style={{
              border: "1px solid black",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={() => handleSorting(header.column.id)}
                      style={{
                        borderBottom: "1px solid black",
                        borderRight: "1px solid black",
                        cursor: "pointer",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "desc" ? " 🔽" : " 🔼"}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                if (!row.original || Object.keys(row.original).length === 0)
                  return null;
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ border: "1px solid black", padding: "8px" }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <span>
              Page{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
          <Box
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"center"}
            mt={45}
          >
            <Link to="/">Home</Link>
          </Box>
        </>
      ) : (
        <Typography>Chargement des données...</Typography>
      )}
    </Stack>
  );
};

export default CurrentEmployees;
