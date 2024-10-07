import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

// Initial rows with default values for the week
const initialRows = [
  { id: randomId(), day: 'Monday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Tuesday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Wednesday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Thursday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Friday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Saturday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
  { id: randomId(), day: 'Sunday', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '' },
];

// Toolbar for adding a new record
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, day: '', breakfast: '', breakfastCost: '', lunch: '', lunchCost: '', dinner: '', dinnerCost: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'day' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

// Main component for the weekly menu grid
export default function WeeklyMenuGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows((rows) => rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows((rows) => rows.filter((row) => row.id !== id));
    }
  };

  const parseCost = (cost) => parseFloat(cost) || 0;

  // Function to calculate total costs for breakfast, lunch, and dinner over the week
  const calculateTotalCosts = () => {
    let totalBreakfastCost = 0;
    let totalLunchCost = 0;
    let totalDinnerCost = 0;

    rows.forEach((row) => {
      totalBreakfastCost += parseCost(row.breakfastCost);
      totalLunchCost += parseCost(row.lunchCost);
      totalDinnerCost += parseCost(row.dinnerCost);
    });

    return { totalBreakfastCost, totalLunchCost, totalDinnerCost };
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((rows) => rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSaveChanges = () => {
    const plans = rows.reduce((acc, row) => {
      acc[row.day] = {
        Breakfast: {
          items: row.breakfast,
          item_cost: row.breakfastCost,
        },
        Lunch: {
          items: row.lunch,
          item_cost: row.lunchCost,
        },
        Dinner: {
          items: row.dinner,
          item_cost: row.dinnerCost,
        },
      };
      return acc;
    }, {});

    console.log('Plans:', plans);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { totalBreakfastCost, totalLunchCost, totalDinnerCost } = calculateTotalCosts();

  // Column configuration
  const columns = [
    { field: 'day', headerName: 'Day', width: 180 },
    { field: 'breakfast', headerName: 'Breakfast', width: 180, editable: true },
    { field: 'breakfastCost', headerName: 'Breakfast Cost', width: 180, editable: true },
    { field: 'lunch', headerName: 'Lunch', width: 180, editable: true },
    { field: 'lunchCost', headerName: 'Lunch Cost', width: 180, editable: true },
    { field: 'dinner', headerName: 'Dinner', width: 180, editable: true },
    { field: 'dinnerCost', headerName: 'Dinner Cost', width: 180, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  // Adding the Total Row at the end of the data
  const totalRow = {
    id: 'total',
    day: 'Total',
    breakfastCost: totalBreakfastCost.toFixed(2),
    lunchCost: totalLunchCost.toFixed(2),
    dinnerCost: totalDinnerCost.toFixed(2),
  };

  // Function to assign a class to the total row
  const getRowClassName = (params) => {
    return params.row.id === 'total' ? 'total-row' : '';
  };

  return (
    <Box sx={{ height: 500, width: '100%', '& .actions': { color: 'text.secondary' } }}>
      <DataGrid
        rows={[...rows, totalRow]} // Include the total row
        columns={columns}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        editMode="row"
        onRowEditStop={handleRowEditStop}
        getRowClassName={getRowClassName} // Apply the class to rows
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        sx={{ mt: 2 }}
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Data saved!"
      />

      {/* Adding custom styles for the total row */}
      <style jsx>{`
        .total-row {
          color: blue !important; /* Change text color to blue */
        }
      `}</style>
    </Box>
  );
}
