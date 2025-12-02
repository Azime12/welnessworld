import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './column';
 import { rows } from './row';
 import { StyledDataGrid } from './pages/kpi/dataGridStyles'; // Adjust the import path as necessary



export default function RowSpanningCustom() {
  
  return (
    <Box sx={{ height: '100%', width: '100%',marginX:'auto',marginTop:10 }}>
      <StyledDataGrid
        rows={rows}
        checkboxSelection={true}
        density='compact'
        clipboardCopyCellDelimiter
        columns={columns}
        // columnHeaderHeight
        // columnVisibilityModel

        pinnedColumns={{ left: ['goal'] }}

        columnsPanel
        columnGroupHeaderHeight
        columnBufferPx
        showCellVerticalBorder
        showColumnVerticalBorder
        autosizeOnMount={true}
        hideFooter
        unstable_rowSpanning
        slots={{ toolbar: GridToolbar }}
        estimatedRowCount
      />
    </Box>
  );
}


