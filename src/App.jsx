import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {Container} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes} from "react-router-dom"
import Toolbar from "@mui/material/Toolbar";
import PocketBase from "pocketbase";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";



import Login from  './Sites/auth/Login.jsx'
import Items from  './Sites/database/Items.jsx'
import Member from  './Sites/database/Member.jsx'
import Partner from  './Sites/database/Partner.jsx'

import Partnerin from './Sites/storage/Partnerin.jsx'

import Redirect from  './Sites/auth/Redirect.jsx'
import Topbar from './Components/header/Topbar.jsx';
import Menu from './Components/menu/Menu.jsx';

import Deal from './Sites/storage/Deal.jsx'

import KeyView from "./Sites/keys/KeyView.jsx";


// import Menu from './Menu/Menu.jsx'

// import TournamentOverview from './Sites/tournament/TournamentOverview.jsx'
// import Tournaments from './Sites/tournament/Tournaments.jsx'
// import Team from "./Sites/UserManagment/Team.jsx";
// import User from "./Sites/UserManagment/User";
// import UserOverview from "./Sites/UserManagment/UserOverview";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    const [pb, setPb] = React.useState(new PocketBase('http://127.0.0.1:8090'));
    const [user, setUser] = React.useState({});
    let navigate = useNavigate();
    pb.autoCancellation(true);
    const GlobalState={
        pb, setPb,user,setUser,
    }


    useEffect(() => {
        if (!pb.authStore.isValid){
            return navigate("/auth/login");
        }
    },[pb]);

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />



                {pb.authStore.isValid ?  <Topbar GlobalState={GlobalState}/> : <div/>}
                {pb.authStore.isValid ?  <Menu/> : <div/>}


                <Container style={{paddingTop:'20px'}}>
                    <Toolbar />

                    <Routes>



                        //Tournament routes
                        {/*<Route path="/tournaments">*/}

                        {/*<Route path=":id" element={<Tournaments GlobalState={GlobalState} value={'SPASTEN'}/>} />*/}
                        {/*<Route path="events" element={<TournamentOverview GlobalState={GlobalState} tname={'Geplante Tuniere'}/>} />*/}
                        {/*<Route path="running" element={<TournamentOverview GlobalState={GlobalState} tname={'Aktuell Laufende Tuniere'}/>} />*/}
                        {/*<Route path="upcoming" element={<TournamentOverview GlobalState={GlobalState} tname={'Beendete Tuniere'}/>} />*/}

                        {/*</Route>*/}

                        {/*<Route path="/usermanagment">*/}
                        {/*    <Route path="login" element={<Login GlobalState={GlobalState}/>}/>*/}
                        {/*    <Route path="team" element={<Team GlobalState={GlobalState}/>}/>*/}
                        {/*    <Route path="user" element={<User GlobalState={GlobalState}/>}/>*/}
                        {/*    <Route path=":id" element={<UserOverview GlobalState={GlobalState}/>}/>*/}
                        {/*</Route>*/}

                        <Route path="/auth">
                            <Route path="login" element={<Login GlobalState={GlobalState}/>}/>
                            <Route path="redirect" element={<Redirect GlobalState={GlobalState}/>}/>
                        </Route>

                        <Route path="/database">
                            <Route path="items" element={<Items GlobalState={GlobalState}/>}/>
                            <Route path="member" element={<Member GlobalState={GlobalState}/>}/>
                            <Route path="partner" element={<Partner GlobalState={GlobalState}/>}/>
                        </Route>

                        <Route path="/storage">
                            <Route path="k_dashboard" element={<Partnerin GlobalState={GlobalState}/>}/>
                            <Route path="item_in" element={<Deal GlobalState={GlobalState}/>}/>
                        </Route>

                        <Route path="/keys">
                            <Route path="dashboard" element={<KeyView GlobalState={GlobalState}/>}/>
                        </Route>

                    </Routes>

                </Container>


            </ThemeProvider>


        </Box>




    );
}

