import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDataCalculation } from '../../utils/useDataCalculation';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

/**
 * React component to display grid of employees with max working duration
 * using Ag-grid lib,
 * @param {array of obj} data
 */
const EmployeeList = ({ data }) => {
  const dataGrid = useDataCalculation(data);

  /**
   * ag grid cell rendering fn to customize duration cell value
   * @param {object} params row element
   */
  const yearCellRenderer = (params) => {
    const duration = daysToWeeks(params.value);
    return ` ${duration.weeks} Weeks${
      duration.days ? ', ' + duration.days + 'Days' : ''
    } `;
  };

  const columnDefs = [
    {
      headerName: 'Maximum Duration Details',
      children: [
        {
          headerName: 'Project ID',
          field: 'projectId',
        },
        {
          headerName: 'Employee1 ID',
          field: 'emp1',
        },
        {
          headerName: 'Employee2 ID',
          field: 'emp2',
        },
        {
          headerName: 'Working duration in week',
          field: 'overlap',
          cellRenderer: yearCellRenderer,
        },
      ],
    },
  ];

  /**
   * calculate weeks in days
   * @param {number} days
   */
  const daysToWeeks = (days) => {
    return {
      weeks: Math.floor(days / 7),
      days: days % 7,
    };
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: 810, margin: 'auto' }}
    >
      <AgGridReact
        rowData={dataGrid}
        columnDefs={columnDefs}
        defaultColDef={{ width: 200 }}
      />
    </div>
  );
};

export default EmployeeList;
