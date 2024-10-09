import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Test2 = () => {
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ]);


const [columnDefs] = useState([
    { field: 'make', sortable: true, filter: true, editable: true  },
    { field: 'model', sortable: true, filter: true, editable: true  },
    { field: 'price', sortable: true, filter: true, editable: true  }
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 330, width: 600 }}>
      <AgGridReact
        rowData={rowData} // Provide the data to the grid
        columnDefs={columnDefs} // Define the columns
        pagination={true} // Enable pagination
  paginationPageSize={5} // Number of rows per page
      />
    </div>
  );
};

export default Test2;
