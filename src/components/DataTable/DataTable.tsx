import React, { useState } from 'react';
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
} from '@tanstack/react-table';
import { DataTableProps } from '../../interfaces/DataTableProps';

function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    });

    return (
        <>
            <input
                className='mb-1 block w-[20%] appearance-none rounded-lg border border-textColor-secondary bg-transparent px-2.5 py-2.5 text-sm text-textColor-secondary autofill:bg-transparent focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                value={(table.getColumn('primary_category')?.getFilterValue() as string) || ''}
                placeholder='Filter by category...'
                onChange={(e) => {
                    table.getColumn('primary_category')?.setFilterValue(e.target.value);
                }}
            />
            <table className='min-w-full'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.length === 0 ? (
                        <tr>
                            <td>No Recent Transactions</td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className='flex items-center justify-end gap-2 py-4'>
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className={`rounded-full border border-textColor-primary bg-textColor-primary p-1 px-2 text-textColor-secondary ${
                        table.getCanPreviousPage()
                            ? 'hover:bg-backgroundColor-primary hover:text-textColor-primary'
                            : ''
                    } disabled:opacity-30`}
                >
                    {'<'}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className={`rounded-full border border-textColor-primary bg-textColor-primary p-1 px-2 text-textColor-secondary ${
                        table.getCanNextPage()
                            ? 'hover:bg-backgroundColor-primary hover:text-textColor-primary'
                            : ''
                    } disabled:opacity-30`}
                >
                    {'>'}
                </button>
                <span className='flex items-center gap-1 text-textColor-secondary'>
                    | Go to page:
                    <input
                        type='number'
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className='w-12 border-0 border-b-2 border-textColor-secondary bg-transparent px-1'
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className='block rounded-lg border border-textColor-secondary bg-backgroundColor-primary p-2.5 text-sm text-textColor-secondary focus:border-textColor-primary focus:ring-textColor-primary'
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default DataTable;
