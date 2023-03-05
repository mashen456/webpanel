import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {colors} from "@mui/material";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(id,name, fighter, finishedfights, bets, profit,date) {
    return {id,name, fighter, finishedfights, bets, profit,date };
}

const rows = [];

function countFighter(obj){
    var count =0;
    obj.map(item=>{
       count = count +1
    })
    return count;
}


export default function RecentTournaments({GlobalState}) {
    const {pb} = GlobalState
    const [upcommingTournaments, setUpcommingTournaments] = React.useState(rows);
    let navigate = useNavigate();


    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const result = await pb.collection('tournaments_8').getList(1, 50);
                result.items.map(items=>{
                    newTable.push(createData(items.id,items.name,countFighter(items.fighter),items.finishedfights,items.bets,items.profit,items.date))
                })
                setUpcommingTournaments(newTable)
                console.log("update")

            } catch (error) {
                console.log('Error:', error);
            }
        }
        pb.collection('tournaments_8').subscribe('*', fetchData)
        fetchData()

        return function cleanup(){
            pb.collection('tournaments_8').unsubscribe();
        }
    },[]);



    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Eventname</StyledTableCell>
                        <StyledTableCell align="right">Tournamentgröße</StyledTableCell>
                        <StyledTableCell align="right">Fights</StyledTableCell>
                        <StyledTableCell align="right">Wetten</StyledTableCell>
                        <StyledTableCell align="right">Einnahmen</StyledTableCell>
                        <StyledTableCell align="right">Datum</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {upcommingTournaments.map((row) => (
                        <StyledTableRow onClick={()=>{
                            navigate("/tournaments/"+row.id);
                        }} hover={true} key={row.name}>

                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.fighter}</StyledTableCell>
                            <StyledTableCell align="right">{row.finishedfights}</StyledTableCell>
                            <StyledTableCell align="right">{row.bets}</StyledTableCell>
                            <StyledTableCell align="right">{row.profit}</StyledTableCell>
                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}