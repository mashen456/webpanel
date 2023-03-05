import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from 'react';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import {useEffect} from "react";
import Radio from '@mui/material/Radio';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function FighterOverview({GlobalState,fightid,tournamentUser}){

    const {pb} = GlobalState
    const [selectedValue, setSelectedValue] = React.useState();
    const [fightList, setFightList] = React.useState({});
    const [fights, setFights] = React.useState([]);
    const [winner, setWinner] = React.useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);


    const [openDialog, setOpenDialog] = React.useState(false);

    const [openDialogRemove, setOpenDialogRemove] = React.useState(false);




    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setWinner(event.target.value)

        const data = {
            "winner": event.target.value
        };

        pb.collection('fights').update(fightid, data);

    };

    function getArrayCount(array){
        let count = 0;
        array.map(item=>{
            count = count +1
        })
        return count
    }




    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenDialogRemove = () => {
        setOpenDialogRemove(true);
    };

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };



    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const record = await pb.collection('fights').getOne(fightid, {
                    expand: 'fight,winner',
                });

                setFightList(record)
                // console.log(record)
                record.expand.fight.map(item=>{
                    newTable.push({nickname:item.username, id:item.id,namen:item.name})
                })
                setFights(newTable)
                if (Object.keys(record.expand).length === 1){
                    return
                }
                setSelectedValue(record.expand.winner.id)
                setWinner(record.expand.winner.id)
            } catch (error) {
                console.log('Error 11:', error);
            }
        }

        fetchData()
        pb.collection('fights').subscribe(fightid, fetchData);

        return function cleanup(){
            pb.collection('fights').unsubscribe();
        }

    },[]);

    async function removeFight() {
        await pb.collection('fights').delete(fightid);
        handleClose()
        window.location.reload(false);


    }

    async function handleRemoveFighter(id) {
        console.log(fights)
        const data = {
            fight: []
        }
        fights.map(items => {
            if (items.id != id) {
                data.fight.push(items.id)
            }
        })
        const record = await pb.collection('fights').update(fightid, data);
    }

    async function handleAddFighter(id) {
        const data = {
            fight: []
        }
        fights.map(items => {
            data.fight.push(items.id)
        })
        data.fight.push(id)
        console.log(data)
        const record = await pb.collection('fights').update(fightid, data);

    }


    return(
        <>
            <List
                key={fightid+'lasd496213'}
                style={{margin:'20px'}}
                  sx={{   bgcolor: 'background.paper' }}
                  subheader={
                <ListSubheader key={fightid+'dasdw465'}>
                    Fight Nr. {fightList.number}
                    <IconButton aria-label="comment" style={{position:'absolute', right:'0px'}} onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={removeFight}>Fight löschen</MenuItem>
                        <MenuItem onClick={()=>{
                            handleClickOpenDialog()
                            handleClose()
                        }
                        }>Fighter entfernen</MenuItem>
                        <MenuItem onClick={()=>{
                            handleClickOpenDialogRemove()
                            handleClose()
                        }
                        }>Fighter hinzufügen</MenuItem>
                    </Menu>

                </ListSubheader>
            }
                  dense={true}

            >

                {fights.map(item=>{
                    return(
                        <>

                            <ListItem key={fightid+'-jh79879'+item.id}>
                                <ListItemIcon>
                                    {
                                        getArrayCount(fights) < 2 ? <SportsMmaIcon /> : item.id == winner ? <DoneIcon /> : winner == '' ? <SportsMmaIcon/>:<CloseIcon/>
                                    }
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-wifi" primary={item.nickname} />
                                <Radio
                                    checked={selectedValue === item.id}
                                    onChange={handleChange}
                                    value={item.id}
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': item.id }}
                                />
                            </ListItem>

                        </>
                    )

                })}

                <Dialog
                    key={'djol990'+fightid}
                    fullScreen
                    open={openDialog}
                    onClose={handleCloseDialog}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseDialog}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Fighter
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List key="asdjlldj9880">
                        {
                            fights.map(items=>{
                                return(
                                    <>
                                        <ListItem key={items.id + '-' + items.namen+'-'+fightid} onClick={()=>{
                                            handleRemoveFighter(items.id)
                                            handleCloseDialog()
                                        }} button >
                                            <ListItemText primary={items.namen} secondary={items.nickname + ' | ID: '+items.id} />
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            })
                        }
                    </List>
                </Dialog>



                <Dialog key={'dsaa31sdasd'+fightid}
                    fullScreen
                    open={openDialogRemove}
                    onClose={handleCloseDialogRemove}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseDialogRemove}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Fighter
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleCloseDialogRemove}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List key="liste-12355">
                        {tournamentUser.map(item=>{
                            return(
                                <>
                                    <ListItem key={item.icid+'rnd123'+fightid} onClick={()=>{
                                        handleAddFighter(item.id)
                                        handleCloseDialogRemove()
                                    }} button >
                                        <ListItemText primary={item.name} secondary={
                                            item.nickname + ' | DB ID: ' + item.id + ' | ICID:'+ item.icid
                                        } />
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                        })}
                    </List>
                </Dialog>

            </List>
        </>
    )
}