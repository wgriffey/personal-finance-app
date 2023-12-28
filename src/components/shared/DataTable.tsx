import React, { useState } from 'react';
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';
import { DataTableProps } from '../../interfaces/DataTableProps';

function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
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
                    className='border-textColor-secondary bg-transparent text-textColor-secondary'
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
