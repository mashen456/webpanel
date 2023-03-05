import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha, styled} from '@mui/material/styles';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {useEffect} from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add.js";
import {Input, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {PhotoCamera} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
        id: 'icon',
        numeric: false,
        disablePadding: true,
        label: 'Icon',
    },
    {
        id: 'ingameId',
        numeric: true,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'nickname',
        numeric: false,
        disablePadding: false,
        label: 'Nickname',
    },

    {
        id: 'fullname',
        numeric: false,
        disablePadding: false,
        label: 'DC Name',
    },
    {
        id: 'dcID',
        numeric: true,
        disablePadding: false,
        label: 'DC ID',
    },
    {
        id: 'perms',
        numeric: true,
        disablePadding: false,
        label: 'Rechte',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'DB ID',
    },
    {
        id: 'telefon',
        numeric: false,
        disablePadding: false,
        label: 'Telefonnummer',
    },
    {
        id: 'kontonummer',
        numeric: true,
        disablePadding: false,
        label: 'Kontonummer',
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
            <TableRow>
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
    const { numSelected, selected, setselected ,pb, items,setitems} = props;

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
                    Member
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={()=>{
                        for (const provider of selected){
                            pb.collection('users').delete(provider)
                        }

                        location.reload()

                    }
                    }>
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

export default function EnhancedTable({GlobalState}) {
    const [order, setOrder] = React.useState('asc');
    const {pb, setPb,user,setUser} = GlobalState

    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [newItemName, setNewItemName] = React.useState("");
    const [items,setItems] = React.useState([{
        'icon':'https://cdn.discordapp.com/attachments/1046155766786162769/1080885356896976937/DCux96qWmol2U0PA7ddkfrP8AELeBvwZOOcwAAAAASUVORK5CYII.png',
        'name':'test',
        'id':'test'
    }]);


    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const result = await pb.collection('users').getList(1, 50,{filter:'member = 1'});
                result.items.map(items=> {
                    newTable.push(
                        {
                            'id': items.id,
                            'ingameId': items.ingameId,
                            'nickname': items.nickname,
                            'icon': items.avatarUrl,
                            'fullname': items.fullname,
                            'dcID': items.dcID,
                            'perms': items.perms,
                            'telefon': items.telefon,
                            'kontonummer': items.kontonummer,
                        })
                })
                setItems(newTable)
                console.log("update")
            } catch (error) {
                console.log('Error:', error);
            }
        }
        pb.collection('items').subscribe('*', fetchData)
        fetchData()

        return function cleanup(){
            pb.collection('items').unsubscribe();
        }
    },[]);


    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'videos';
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = async (e) => {
            console.log('go')
            try {
                const formData = new FormData();
                formData.append('icon', target.files[0]);
                formData.append('name',newItemName)
                const result =   await pb.collection('items').create(formData);
                location.reload()
            }
            catch (e) {
                console.log(e)
            }
        };
    };




    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = items.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const Input = styled('input')({
        display: 'none',
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} setselected={setSelected} selected={selected} pb={pb} items={items} setitems={setItems} />
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
                            rowCount={items.length}
                        />
                        <TableBody>
                            {stableSort(items, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
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
                                            <TableCell><img src={row.icon} /></TableCell>
                                            <TableCell align="right">{row.ingameId}</TableCell>
                                            <TableCell align="right">{row.nickname}</TableCell>
                                            <TableCell align="right">{row.fullname}</TableCell>
                                            <TableCell align="right">{row.dcID}</TableCell>
                                            <TableCell align="right">{row.perms}</TableCell>
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.telefon}</TableCell>
                                            <TableCell align="right">{row.kontonummer}</TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
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
                    rowsPerPageOptions={[10, 15, 30]}
                    component="div"
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/*<Paper>*/}
            {/*    <Typography*/}
            {/*        style={{paddingTop:'15px',paddingLeft:'15px'}}*/}
            {/*        sx={{ flex: '1 1 100%' }}*/}
            {/*        variant="h6"*/}
            {/*        id="tableTitle"*/}
            {/*        component="div"*/}
            {/*    >*/}
            {/*        Items hinzufügen*/}
            {/*    </Typography>*/}

            {/*    <Typography style={{paddingTop:'15px',paddingLeft:'15px'}}>*/}
            {/*        Um ein neues item hinzuzufügen wird ein ICON inform einer png/jpeg etc... benötigt.<br/>*/}
            {/*        Gib dem neuen Item erst einen Namen und wähle dann die Upload funktion aus.<br/>*/}
            {/*        Im Anschluss wird dieses automatisch erstellt.*/}
            {/*    </Typography>*/}

            {/*    <Stack direction="row" alignItems="center" spacing={2} style={{paddingTop:'15px',paddingLeft:'15px',paddingBottom:'15px'}}>*/}

            {/*        <TextField id="filled-basic" label="Item Name" variant="filled" onChange={(event) =>{*/}
            {/*            setNewItemName(event.target.value)*/}
            {/*        }*/}
            {/*        }  />*/}

            {/*        <div >*/}
            {/*            <label htmlFor="upload-photo">*/}
            {/*                <input*/}
            {/*                    style={{ display: "none" }}*/}
            {/*                    id="upload-photo"*/}
            {/*                    name="upload-photo"*/}
            {/*                    type="file"*/}
            {/*                    accept="image/*"*/}
            {/*                    onChange={handleCapture}*/}
            {/*                />*/}

            {/*                <Fab color="primary" size="medium" component="span" aria-label="add" >*/}
            {/*                    <PhotoCamera  />*/}
            {/*                </Fab>*/}

            {/*            </label>*/}
            {/*        </div>*/}

            {/*    </Stack>*/}
            {/*</Paper>*/}

        </Box>
    );
}
