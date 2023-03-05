import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Autocomplete, CircularProgress} from "@mui/material";
import FighterOverview from "./utils/FighterOverview.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import SportsMmaIcon from '@mui/icons-material/SportsMma';



function createData(name, nickname, perms, kontonummer, id,icid) {
    return {
        name,
        nickname,
        perms,
        kontonummer,
        id,
        icid,
    };
}



const rows = [
    createData('Max Mustermann', 'Mustermax', 99, 8888, 'dasadd4665','420'),

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'nickname',
        numeric: false,
        disablePadding: false,
        label: 'Nickname',
    },
    {
        id: 'perms',
        numeric: false,
        disablePadding: false,
        label: 'Rechte',
    },
    {
        id: 'kontonummer',
        numeric: false,
        disablePadding: false,
        label: 'Kontonummer',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'DBID',
    },

    {
        id: 'icid',
        numeric: true,
        disablePadding: false,
        label: 'ID',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key='head1'>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const {pb, numSelected,titleName,selectedNames,tournamentid } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Tournament: {titleName}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={()=>{
                        deleteMemberFromTournament(pb,selectedNames,tournamentid)
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>

                </Tooltip>

            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

async function deleteMemberFromTournament(pb,selectedNames,tournamentid) {

    let ids = []
    let requeststring = ""
    selectedNames.map(item => {
        requeststring = requeststring + 'name =' + '"' + item + '"' + ' || '


    })
    requeststring = requeststring.slice(0, -4)
    try {
        const resultList = await pb.collection('users').getList(1, 50, {
            filter: requeststring,
        });

        resultList.items.map(id=>{
            ids.push(id.id)
        })


        const currentTournamentList = await pb.collection('tournaments_8').getOne(tournamentid);

        let difference = currentTournamentList.fighter.filter(x => !ids.includes(x));

        const data = {
            "fighter": difference,
        };

        const record = await pb.collection('tournaments_8').update(tournamentid, data);



    } catch (error) {
        console.log('Error 0:', error);
    }
}


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}




export default function Tournaments({GlobalState}, props) {
    const {pb} = GlobalState

    const {id} = useParams()
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [tournamentName, setTournamentName] = React.useState('-TournamentName-');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [tblData,settblData] = React.useState(rows);

    const [selectedAddFighterDialog, setSelectedAddFighterDialog] = React.useState('');
    const [openAddFighterDialog, setOpenAddFighterDialog] = React.useState(false);
    const [openAddSelectFighterDialog, setOpenAddSelectFighterDialog] = React.useState(false);
    const [optionsAddSelectFighterDialog, setOptionsAddSelectFighterDialog] = React.useState([]);
    const loadingAddSelectFighterDialog = openAddSelectFighterDialog && optionsAddSelectFighterDialog.length === 0;

    const [openCreateFight, setOpenCreateFight] = React.useState(false);
    const [openCreateFFight, setOpenCreateFFight] = React.useState(false);

    const handleClickOpenCreateFight = () => {
        setOpenCreateFight(true);
    };

    const handleClickOpenCreateFFight = () => {
        setOpenCreateFFight(true);
    };

    const handleCloseCreateFight = () => {
        setOpenCreateFight(false);
    };

    const handleCloseCreateFFight = () => {
        setOpenCreateFFight(false);
    };

    async function handleCreateNewFight() {
        handleCloseCreateFight()
        const resultList = await pb.collection('fights').getList(1, 50, {
            filter: 'tournament = "'+id+'"',
        });
        await pb.collection('fights').create({
            "tournament": id,
            "number": resultList.items.length+1,
        });
        window.location.reload(false);

    }

    async function handleCreateNewFFight() {
        handleCloseCreateFFight()
        const resultList = await pb.collection('fights').getList(1, 50, {
            filter: 'tournament = "'+id+'"',
        });
        await pb.collection('fights').create({
            "tournament": id,
            "number": resultList.items.length +1,
        });
        await pb.collection('fights').create({
            "tournament": id,
            "number": resultList.items.length +2,
        });
        await pb.collection('fights').create({
            "tournament": id,
            "number": resultList.items.length +3,
        });
        await pb.collection('fights').create({
            "tournament": id,
            "number": resultList.items.length +4,
        });
        window.location.reload(false);

    }


    const [getFights, setgetFights] = React.useState([]);


    const addFighterDialogDropdownList = [];


    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const record = await pb.collection('tournaments_8').getOne(id, {
                    expand: 'fighter',
                });

                record.expand.fighter.map(item=>{
                    newTable.push(createData(item.name,item.username,item.rechte,item.kontonummer,item.id,item.icid))
                })
                settblData(newTable)
                setTournamentName(record.name)

            } catch (error) {
                console.log('Error1:', error);
            }
        }

        pb.collection('tournaments_8').subscribe('*', fetchData);
        fetchData()

        return function cleanup(){
            pb.collection('tournaments_8').unsubscribe();
        }


    },[]);

    useEffect(() => {
        let activeAddSelectFighterDialog = true;

        if (!loadingAddSelectFighterDialog) {
            return undefined;
        }

        (async () => {
            const records = await pb.collection('users').getFullList(500 /* batch size */, {
                sort: '-created',
            });
            records.map(item=>{
                addFighterDialogDropdownList.push({title:item.username + ' | '+ item.name,year:item.id})
            })

            if (activeAddSelectFighterDialog) {
                setOptionsAddSelectFighterDialog([...addFighterDialogDropdownList]);
            }
        })();

        return () => {
            activeAddSelectFighterDialog = false;
        };
    }, [loadingAddSelectFighterDialog]);

    useEffect(() => {
        if (!openAddSelectFighterDialog) {
            setOptionsAddSelectFighterDialog([]);
        }
    }, [openAddSelectFighterDialog]);





    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const resultList = await pb.collection('fights').getList(1, 50,
                    {
                        filter: 'tournament = "'+id+'"',
                        expand: 'fight,winner'
                    });

                resultList.items.map(item=>{
                    newTable.push(item.id)
                })
                setgetFights(newTable)
            } catch (error) {
                console.log('Error2:', error);
            }
        }

        fetchData()
        pb.collection('fights').subscribe('*', fetchData);

        return function cleanup(){
            pb.collection('fights').unsubscribe();
        }

    },[]);

    function returnArrayCount(array){
        let count = 0
        array.map(item=>{
            count = count+1
        })
        return count
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = tblData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name,id) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];


        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tblData.length) : 0;


    const handleClickOpenAddFighterDialog = () => {
        setOpenAddFighterDialog(true);
    };

    const handleCloseAddFighterDialog = () => {
        setOpenAddFighterDialog(false);
    };



    const actions = [
        { icon: <AddIcon onClick={handleClickOpenAddFighterDialog} />, name: 'Fighter zum Tournament hinzugügen',key:'3'},
        { icon: <SportsMmaIcon onClick={handleClickOpenCreateFight} />, name: 'Fight hinzufügen', key:"1"},
        { icon: <SportsMmaIcon onClick={handleClickOpenCreateFFight} />, name: '4 Fights hinzufügen', key:"2"},
    ];

    async function addFighterToTournament() {
        if (selectedAddFighterDialog == '') {
            handleCloseAddFighterDialog()
            return
        }
        let fighter =[]
        try {
            const record = await pb.collection('tournaments_8').getOne(id);
            fighter = record.fighter
            fighter.push(selectedAddFighterDialog)


        } catch (error) {
            console.log('Error 4:', error);
        }



        const data = {
            "fighter": fighter
        };

        await pb.collection('tournaments_8').update(id, data);
        handleCloseAddFighterDialog()


    }





    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 4 }}>
                <EnhancedTableToolbar pb={pb} numSelected={selected.length} titleName={tournamentName} selectedNames={selected} tournamentid={id} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={tblData.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(tblData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name,row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.nickname}</TableCell>
                                            <TableCell align="right">{row.perms}</TableCell>
                                            <TableCell align="right">{row.kontonummer}</TableCell>
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.icid}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow key='dens123'
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[8, 12, 16]}
                    component="div"
                    count={tblData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Paper style={{paddingTop:'20px'}}>
                <Grid container spacing={2} >

                {getFights.map(item=>{
                    return (<>
                    <Grid xs={6} md={4} key={item + 'sdaw123'}>
                        <FighterOverview GlobalState={GlobalState} fightid={item} tournamentUser={tblData}/>
                    </Grid>
                    </>
                        )
                })}


                </Grid>

                <div><br/> </div>
            </Paper>
        </Box>

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}

            </SpeedDial>

            <Dialog open={openAddFighterDialog} onClose={handleCloseAddFighterDialog}>
                <DialogTitle>Fighter zum Tournament hinzufügen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Um einen Fighter zum Tournament hinzuzufügen wähle ihn unten aus der Liste aus.<br/>
                        Falls er noch nicht in der liste angezeigt wird füge Ihn/Sie/Es unter dem Menüpunkt
                        Usermanagment hinzu.
                    </DialogContentText>
                    <Autocomplete
                        id="asynchronous-demo"
                        style={{paddingTop:'20px'}}
                        open={openAddSelectFighterDialog}
                        onOpen={() => {
                            setOpenAddSelectFighterDialog(true);
                        }}
                        onClose={() => {
                            setOpenAddSelectFighterDialog(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        options={optionsAddSelectFighterDialog}
                        loading={loadingAddSelectFighterDialog}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nickname | Name"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loadingAddSelectFighterDialog ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        onChange={(event, newInputValue)=>{
                            setSelectedAddFighterDialog(newInputValue.year)

                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color={"secondary"} onClick={handleCloseAddFighterDialog}>Abbrechen</Button>
                    <Button onClick={addFighterToTournament}>Hinzufügen</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateFight} onClose={handleCloseCreateFight}>
                <DialogTitle>Fight anlegen.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bist du dir sicher, dass du einen weiteren fight anlegen möchtest?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateFight}>Abbrechen</Button>
                    <Button onClick={handleCreateNewFight}>Erstellen</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateFFight} onClose={handleCloseCreateFFight}>
                <DialogTitle>4 Fights anlegen.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bist du dir sicher, dass du 4 weitere fights anlegen möchtest?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateFFight}>Abbrechen</Button>
                    <Button onClick={handleCreateNewFFight}>Erstellen</Button>
                </DialogActions>
            </Dialog>




        </>
    );
}