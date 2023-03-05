import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import Component from 'react'




export default function TransactionTable ( {GlobalState, table} ) {
    const {pb} = GlobalState
    const {id} = useParams()
    const [data, setData] = React.useState([]);


    useEffect(() => {
        async function fetchData(){
            try {
                const records = await pb.collection(table).getFullList(50 /* batch size */, {
                    sort: '-created', filter:'user = "' +id+'"',expand:'bookedby'
                });
                setData(records)
            } catch (error) {
                console.log('Error:', error);
            }
        }
        pb.collection(table).subscribe('*', fetchData);
        fetchData()
        return function cleanup(){
            pb.collection(table).unsubscribe();
        }
    },[]);






    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Betrag</TableCell>
                        <TableCell align="right">Buchumsdatum</TableCell>
                        <TableCell align="right">Auftragsdatum</TableCell>
                        <TableCell align="right">Verwendungszweck</TableCell>
                        <TableCell align="right">Bearbeiter</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} style={row.cancle === false ? (row.booked ?({backgroundColor:'#457d32'}):({})):{backgroundColor:'#7d3232'}}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" >{row.amount + ' $'}</TableCell>
                            <TableCell align="right">{row.dateBooked}</TableCell>
                            <TableCell align="right">{row.created}</TableCell>
                            <TableCell align="right">{row.verwendungszweck}</TableCell>
                            <TableCell align="right">{Object.keys(row.expand).length !== 0 ?(row.expand.bookedby.username):(' ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}