import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {IconButton, MenuItem} from "@mui/material";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import {useEffect} from "react";
export default function Topbar({GlobalState}){
    const {pb, setPb,user,setUser} = GlobalState
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [luser,setlUser] = React.useState(JSON.parse(window.localStorage.getItem('user')));

    // useEffect(() => {
    //     const data = window.localStorage.getItem('user');
    //     setUser(JSON.parse(data));
    // }, []);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(user)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <AppBar style={{backgroundColor:'#662222'}} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {/*<SportsMmaIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                     Yakuza / ヤクザ / PANEL
                </Typography>

                <Typography
                    variant="h8"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        position : 'absolute',
                        right : '75px'
                    }}
                >
                    {luser.meta.name}
                </Typography>

                {auth && (
                    <div style={{position:'fixed',right:'10px'}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar alt="Remy Sharp" src={luser.meta.avatarUrl} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={()=>{
                                pb.authStore.clear()
                                window.location.reload(false);
                            }}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}


            </Toolbar>
        </AppBar>
    )
}