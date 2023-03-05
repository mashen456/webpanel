import * as React from 'react';
import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from "./utils/TransactionTable";




export default function UserOverview({GlobalState}){
    const {pb} = GlobalState
    const {id} = useParams()
    const [username, setusername] = React.useState("");
    const [name, setname] = React.useState("");
    const [rechte, setrechte] = React.useState("");
    const [icid, seticid] = React.useState("");
    const [dcid, setdcid] = React.useState("");
    const [dc_tag, setdc_tag] = React.useState("");
    const [created, setcreated] = React.useState("");
    const [cid, setcid] = React.useState("");
    const [balance, setbalance] = React.useState(0);
    const [avatar,setAvatar] = React.useState('https://cdn.discordapp.com/attachments/1045995309467172864/1052011048246464652/Download_6.jpeg')



    useEffect(() => {
        async function fetchData(){
            try {
                const record = await pb.collection('users').getOne(id);
                setusername(record.username)
                setname(record.name)
                setrechte(record.rechte)
                seticid(record.icid)
                setdcid(record.dcid)
                setdc_tag(record.dc_tag)
                setcreated(record.created)
                setcid(record.id)
                setbalance(record.balance)
                if (record.avatar !== ''){
                    setAvatar(pb.getFileUrl(record, record.avatar, {'thumb': '150x150'}))
                }

            } catch (error) {
                console.log('Error:', error);
            }
        }
        fetchData()
        pb.collection('users').subscribe(id, fetchData);

        return function cleanup(){
            pb.collection('users').unsubscribe();
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
                formData.append('avatar', target.files[0]);
                const result =   await pb.collection('users').update(cid, formData);
                const url = pb.getFileUrl(result, result.avatar, {'thumb': '150x150'});
                setAvatar(url)
            }
            catch (e) {
                console.log(e)
            }
        };
    };


    return(
        <>

            <Box sx={{ width: '100%' }}>
                <Typography variant="h3" style={{marginBottom:'20px'}}>
                    {name}
                </Typography>
                <Paper sx={{ width: '100%', mb: 4 }}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <div style={{ paddingLeft:'10px', paddingRight:'10px'}}>
                                <Box
                                    component='img'
                                    sx={{
                                        height: 300,
                                        width: 300,
                                        maxHeight: { xs: 300, md: 300 },
                                        maxWidth: { xs: 300, md: 300 },
                                    }}
                                    alt="Avatar Image"
                                    src={avatar}
                                />
                                    <div style={{position:'relative', bottom:'25px',left:'275px'}}>
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: "none" }}
                                            id="upload-photo"
                                            name="upload-photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCapture}
                                        />

                                        <Fab color="primary" size="small" component="span" aria-label="add">
                                            <AddIcon />
                                        </Fab>
                                    </label>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Username"
                                            value={username}
                                            onChange={async (e) => {
                                                setusername(e.target.value)
                                                await pb.collection('users').update(cid, {"username": e.target.value});

                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Name"
                                            value={name}
                                            onChange={async (e) => {
                                                setname(e.target.value)
                                                await pb.collection('users').update(cid, {"name": e.target.value});
                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Rechte"
                                            value={rechte}
                                            type='number'
                                            onChange={async (e) => {
                                                setrechte(e.target.value)
                                                await pb.collection('users').update(cid, {"rechte": e.target.value});

                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="IC ID"
                                            value={icid}
                                            onChange={async (e) => {
                                                seticid(e.target.value)
                                                await pb.collection('users').update(cid, {"icid": e.target.value});
                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Discord ID"
                                            value={dcid}
                                            onChange={async (e) => {
                                                setdcid(e.target.value)
                                                await pb.collection('users').update(cid, {"dcid": e.target.value});
                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Discord Tag"
                                            value={dc_tag}
                                            onChange={async (e) => {
                                                setdc_tag(e.target.value)
                                                await pb.collection('users').update(cid, {"dc_tag": e.target.value});
                                            }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Erstellt"
                                            value={created}
                                            // onChange={}
                                            disabled
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="ID"
                                            value={cid}
                                            // onChange={}
                                            disabled
                                        />
                                        <TextField
                                            id="outlined-name"
                                            label="Balance"
                                            value={balance + ' $'}
                                            // onChange={}
                                            disabled
                                        />


                                    </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Typography variant="h5" style={{marginBottom:'20px'}}>
                    Einzahlungen
                </Typography>
                <Paper sx={{ width: '100%', mb: 4 }}>

                    <TransactionTable GlobalState={GlobalState} table={'einzahlungen'}/>

                </Paper>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Typography variant="h5" style={{marginBottom:'20px'}}>
                    Auszahlungen
                </Typography>
                <Paper sx={{ width: '100%', mb: 4 }}>

                    <TransactionTable GlobalState={GlobalState} table={'auszahlen'}/>

                </Paper>
            </Box>

        </>
    )


}