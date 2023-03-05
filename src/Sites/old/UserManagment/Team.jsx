import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import FullFeaturedCrudGrid from './utils/UserTable.jsx'


export default function Team({GlobalState}){
    const {pb,setPb} = GlobalState

    return(
        <>

            <Box sx={{ width: '100%' }}>

                    <Typography variant="h3" style={{marginBottom:'20px'}}>
                        Teamübersicht
                    </Typography>
                <Paper sx={{ width: '100%', mb: 4 }}>

                    <div style={{margin:'20px', paddingBottom:'20px', paddingTop:'20px'}}>
                        <FullFeaturedCrudGrid GlobalState={GlobalState} filter={'rechte > 1'}/>
                    </div>
                </Paper>
            </Box>

        </>
    )


}