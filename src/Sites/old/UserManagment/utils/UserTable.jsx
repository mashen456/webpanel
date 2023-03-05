import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGridPro,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import {useEffect} from "react";
import KeyIcon from '@mui/icons-material/Key';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const initialRows = [
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id,  isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                User Hinzufügen
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}


export default function FullFeaturedCrudGrid({GlobalState,filter}) {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const {pb} = GlobalState
    const [open, setOpen] = React.useState(false);
    const [openPSW, setOpenPSW] = React.useState(false);
    const [psw,setPsw]=React.useState('');
    const [changeID,setChangeID]=React.useState('');
    const [username,setUsername]=React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenPSW = () => {
        setOpenPSW(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClosePSW = () => {
        setOpenPSW(false);
    };

    const handleChangePSW=async () => {
        const data = {
            "password": psw,
            "passwordConfirm": psw
        };

        try {
            const record = await pb.collection('users').update(changeID, data);
        }
        catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const records = await pb.collection('users').getFullList(200 /* batch size */, {
                    sort: '-created',
                    filter: filter
                });

                records.map(item=>{
                    newTable.push(
                        {
                            id:item.id,
                            name:item.name,
                            username:item.username,
                            rechte:item.rechte,
                            kontonummer:item.kontonummer,
                            icid:item.icid,
                            created:item.created,
                            updated:item.updated,
                            isNew: false
                        }
                        )
                })

            } catch (error) {
                console.log('Error:', error);
            }
            setRows(newTable)
        }


        pb.collection('users').subscribe('*', fetchData);
        fetchData()

        return function cleanup(){
            pb.collection('users').unsubscribe();
        }


    },[]);


    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        setRows(rows.filter((row) => row.id !== id));
        await pb.collection('users').delete(id);
    };

    const handlePswClick=(id)=>()=>{
        setChangeID(id)
        handleClickOpen()
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        console.log(newRow)
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        const data = {
            "username": newRow.username,
            "name": newRow.name,
            "rechte": newRow.rechte,
            "kontonummer": newRow.kontonummer,
            "icid": newRow.icid
        };
        try {
            if (newRow.isNew === true){
                data.password = newRow.id
                data.passwordConfirm = newRow.id
                const record = await pb.collection('users').create(data);
                setPsw(newRow.id)
                setUsername(newRow.username)
                handleClickOpenPSW()
            }
            else {
                const result = await pb.collection('users').update(newRow.id, data);
            }

        }
        catch (e) {
            console.log(e)
        }

        return updatedRow;
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'username', headerName: 'Username', width: 100, editable: true },
        { field: 'rechte', headerName: 'Rechte', type: 'number', editable: true },
        { field: 'kontonummer', headerName: 'Kontonummer',width: 128, type: 'text', editable: true },
        { field: 'icid', headerName: 'ID', type: 'text',width: 128, editable: true },
        {
            field: 'created',
            headerName: 'Beigetreten',
            type: 'date',
            width: 250,
            editable: false,
        },

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
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<KeyIcon />}
                        label="Change Psw"
                        onClick={handlePswClick(id)}
                        color="inherit"
                    />,

                ];
            },
        },
    ];

    return (<>
        <Box
            sx={{
                height: '80vh',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGridPro
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                components={{
                    Toolbar: EditToolbar,
                }}
                componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chang / Set Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Denke dran den Benutzer über die Änderung zu informieren! <br/>
                        Er wird nicht benachrichtigt!
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e=>{
                            setPsw(e.target.value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={handleChangePSW}>Change</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPSW} onClose={handleClosePSW}>
                <DialogTitle>User "{username}" wurde mit folgenden Daten erstellt:</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{paddingBottom:"20px"}}>
                        Username:
                        <br/>
                        {username}
                        <br/>
                        PSW:
                        <br/>
                        {psw}
                        <br/>

                    </DialogContentText>
                    <Button  onClick={()=>{
                    copyTextToClipboard('Username: "'+username + '" \nPasswort: "'+psw+'"')
                    }
                    }>Copy to Clipboard</Button>

                </DialogContent>
            </Dialog>

        </>


    );
}