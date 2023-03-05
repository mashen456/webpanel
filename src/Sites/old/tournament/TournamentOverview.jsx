import {
    Alert,
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Snackbar,
    TextField
} from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import RecentTournaments from "./table/RecentTournaments.jsx";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




export default function TournamentOverview({GlobalState, tname}){
    const {pb} = GlobalState
    const [name, setName] = React.useState('NONE');
    const [openSuccess, setOpenSucess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openNewTournament, setOpenNewTournament] = React.useState(false);

    const handleClickOpenNewTournament = () => {
        setOpenNewTournament(true);
    };

    const handleCloseNewTournament = () => {
        setOpenNewTournament(false);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucess(false);
        setOpenError(false);
    };


    async function createBracket16() {
        const data = {
            "name": name,
        };
        try {
            const record = await pb.collection('tournaments_8').create(data)
            setOpenSucess(true)
            handleCloseNewTournament()

        } catch (error) {
            setOpenError(true)
            handleCloseNewTournament()
        }

    }

    return(<Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} >

                <Grid xs={12}>
                    <Typography variant="h3" gutterBottom>
                        {tname}
                    </Typography>
                </Grid>

                <Grid xs={12}>
                    <RecentTournaments GlobalState={GlobalState}/>
                </Grid>

              </Grid>



            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Das Tournamen wurde erfolgreich mit dem Namen: {name} erstellt !!!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Tournament konnte nicht erstellt werden<br/>
                    Kann sein, dass der Name schon vergeben ist...<br/>
                    Versuche einen anderen namen oder wende dich an einen Admin...
                </Alert>
            </Snackbar>


            <Dialog open={openNewTournament} onClose={handleCloseNewTournament}>
                <DialogTitle>Neues Tournament erstellen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aktuell sind 3 Arten von Single elemination tournaments implementiert (4,8,16) Fighter.
                        Bennene das Tournament und wähle eine anzahl an Teilnehmern aus.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tournament Name"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e=> setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewTournament}>Abbrechen</Button>
                    <Button onClick={handleCloseNewTournament}>4 Fighter</Button>
                    <Button onClick={createBracket16}>8 Fighter</Button>
                    <Button onClick={handleCloseNewTournament}>16 Fighter</Button>
                </DialogActions>
            </Dialog>


            <div style={{ margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed'}}
            >
                <Box  sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={()=>{
                            handleClickOpenNewTournament()
                        }} />
                    </Fab>

                </Box>
            </div>


        </Box>



    )
}