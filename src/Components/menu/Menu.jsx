import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {Box} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PeopleIcon from '@mui/icons-material/People';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import {Link} from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

import './Menu.css'

const drawerWidth = 240;

export default function Menu(){
    return(

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >

            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>

                {/*<List>*/}
                {/*    <Link to="/tournaments/tbjladfgyyqqjb3">*/}
                {/*    <ListItem key={"s5152111ada41sda"} disablePadding>*/}
                {/*        <ListItemButton>*/}

                {/*            <ListItemText primary={"Database"} />*/}

                {/*        </ListItemButton>*/}
                {/*    </ListItem>*/}
                {/*    </Link>*/}

                {/*    <Link to="/tournaments/events">*/}
                {/*    <ListItem key={"sad15a123sdadas"} disablePadding>*/}
                {/*        <ListItemButton>*/}
                {/*            <ListItemIcon>*/}
                {/*                <EventIcon />*/}
                {/*            </ListItemIcon>*/}
                {/*            <ListItemText primary={"Zukünftig"} />*/}
                {/*        </ListItemButton>*/}
                {/*    </ListItem>*/}
                {/*    </Link>*/}

                {/*    <Link to="/tournaments/running">*/}
                {/*    <ListItem key={"sadasasd51dadas"} disablePadding>*/}
                {/*        <ListItemButton>*/}
                {/*            <ListItemIcon>*/}
                {/*                <EventAvailableIcon />*/}
                {/*            </ListItemIcon>*/}
                {/*            <ListItemText primary={"Aktuell"} />*/}
                {/*        </ListItemButton>*/}
                {/*    </ListItem>*/}
                {/*    </Link>*/}

                {/*    <Link to="/tournaments/upcoming">*/}
                {/*    <ListItem key={"sada132132sdadas"} disablePadding>*/}
                {/*        <ListItemButton>*/}
                {/*            <ListItemIcon>*/}
                {/*                <EventBusyIcon />*/}
                {/*            </ListItemIcon>*/}
                {/*            <ListItemText primary={"Vergangen"} />*/}
                {/*        </ListItemButton>*/}
                {/*    </ListItem>*/}
                {/*    </Link>*/}




                {/*</List>*/}
                <Divider />
                <List>
                    <Link to="/usermanagment/6uezi4mkjioqnfd">
                    <ListItem key={"sada415sdqeewadas"} disablePadding>
                        <ListItemButton>
                           <ListItemText primary={"Management Koks"} />
                        </ListItemButton>
                    </ListItem>
                    </Link>

                    <Link to="/storage/k_dashboard">
                    <ListItem key={"sadaads231123asdsdadas"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DomainAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Partner Übergaben"} />
                        </ListItemButton>
                    </ListItem>
                    </Link>

                    <Link to="/storage/item_in">
                    <ListItem key={"sadasdad151523dsasdas"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Lager OUT"} />
                        </ListItemButton>
                    </ListItem>
                        </Link>
                </List>

                <Divider />


                <List>
                    <Link to="/usermanagment/6uezi4mkjioqnfd">
                        <ListItem key={"sada415sdqeewadas"} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={"Management Dope"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/keys/dashboard">
                        <ListItem key={"sadaads231123asdsdadas"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DomainAddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Schlüsselübersicht"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/usermanagment/user">
                        <ListItem key={"sadasdad151523dsasdas"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Lager OUT"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>

                <Divider />
                <List>
                    <Link to="/usermanagment/6uezi4mkjioqnfd">
                        <ListItem key={"sada415sdqeewadas"} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={"Management Money"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/storage/partnerout">
                        <ListItem key={"sadaads231123asdsdadas"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DomainAddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Einnahmen"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/usermanagment/user">
                        <ListItem key={"sadasdad151523dsasdas"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Ausgaben"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/usermanagment/user">
                        <ListItem key={"sadasdad151523dsasdas"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Kassenbuch"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Divider />

                <List>
                    <ListItem key={"sadasdq5115eewadas"} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={"Database"} />
                        </ListItemButton>
                    </ListItem>

                    <Link to="/database/items">
                    <ListItem key={"sadaads142124asdsdadas"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Items"} />
                        </ListItemButton>
                    </ListItem>
                    </Link>

                    <Link to="/database/member">
                    <ListItem key={"sad312asdaddsasdas"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Member"} />
                        </ListItemButton>
                    </ListItem>
                    </Link>

                    <Link to="/database/partner">
                    <ListItem key={"sadasdad12dsasdas"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChildFriendlyIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Partner"} />
                        </ListItemButton>
                    </ListItem>
                    </Link>

                </List>

                <Divider />


            </Box>


        </Drawer>


    )
}