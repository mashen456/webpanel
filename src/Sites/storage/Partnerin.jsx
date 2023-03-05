import { Box, useTheme } from "@mui/material";
import UserBigIcon from "../../Components/parts/icons/UserBigIcon.jsx";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "../../Components/parts/icons/ErrorIcon.jsx";
import Grid from "@mui/material/Grid";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LeadCard from "../../Components/parts/LeadCard.jsx";
import LongCard from "../../Components/parts/LongCard.jsx";
import LeadVSCustomer from "../../Components/parts/LeadVSCustomer.jsx";
import ProjectStatus from "../../Components/parts/ProjectStatus.jsx";
import CustomerList from "../../Components/parts/customerList/index.jsx";
import MoneyIcon from "../../Components/parts/icons/MoneyIcon.jsx";
import CloudIcon from "../../Components/parts/icons/CloudIcon.jsx";
import HourGlassIcon from "../../Components/parts/icons/HourGlassIcon.jsx";


export default function Partner({GlobalState}) {
    const theme = useTheme();

    const list1 = [{
        id: 1,
        amount: '800.000 $',
        Icon: MoneyIcon,
        title: "kumulierte Einnahmen",
        color: '#1dff00'
    }, {
        id: 2,
        amount: 33,
        Icon: CloudIcon,
        title: "Pakete auf Lager",
        color: theme.palette.info.main
    }, {
        id: 3,
        amount: 1400,
        Icon: HourGlassIcon,
        title: "Tüten zu verarbeiten",
        color: theme.palette.text.disabled
    }];

    const list2 = [{
        id: 1,
        amount: 2100,
        Icon: LocalShippingIcon,
        title: "Kokasamen im Lager",
        color: theme.palette.primary.main
    }, {
        id: 2,
        amount: 413,
        Icon: UserBigIcon,
        title: "Kokasamen im Umlauf",
        color: theme.palette.warning.main
    }, {
        id: 3,
        amount: 350,
        Icon: DoneIcon,
        title: "Ausgezahlte Kokspakete",
        color: theme.palette.info.main
    }, {
        id: 4,
        amount: 20,
        Icon: ErrorIcon,
        title: "Offene Kokspakete",
        color: theme.palette.error.main
    }];

    let parts,colors,names,chartSeries,name,ammount,max

    //top producer
    name = "18th Str."
    ammount = 40
    max = 51


    //anteil gangs chart
    parts = [0,26,0,25]
    names = ["Scorpions", "18th Str.", "Hustler",'Familienbestand']
    colors = ['#662222', '#0d00ff', '#e07300','#00ffd7']

    chartSeries = [{
        name: "Scorpions",
        data: [0, 10, 0, 10, 0, 0, 0]
    }, {
        name: "18th Str.",
        data: [0, 0, 18, 0, 0, 0, 21]
    }];

    //anteile gangs
    const props={
        parts,colors,names
    }
    //abgabenübersicht
    const abgabenChart={
        colors,chartSeries
    }
    //top Producer
    const topProducer={
        name,ammount,max
    }

    const customerListData = [{
        member: "Hefe",
        amount: "2400",
        avatar: "/static/avatar/001-man.svg",
        clientmember: "Soul",
        client: "18th Str."
    },{
        member: "Wladi",
        amount: "1400",
        avatar: "/static/avatar/001-man.svg",
        clientmember: "Albert",
        client: "Scorpions"
    },{
        member: "MB",
        amount: "4",
        avatar: "/static/avatar/001-man.svg",
        clientmember: "Albert",
        client: "Scorpions"
    },{
        member: "PA",
        amount: "800",
        avatar: "/static/avatar/001-man.svg",
        clientmember: "Soul",
        client: "18th Str."
    },{
        member: "Diego",
        amount: "16",
        avatar: "/static/avatar/001-man.svg",
        clientmember: "Albert",
        client: "Scorpions"
    },];




    return(
        <>

            <Box pt={2} pb={4}>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <LeadCard topProducer={topProducer} />
                    </Grid>

                    <Grid item md={8} xs={12}>
                        <LongCard list={list1} />
                    </Grid>

                    <Grid item md={8} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <LeadVSCustomer abgabenChart={abgabenChart} />
                            </Grid>

                            <Grid item xs={12}>
                                <LongCard list={list2} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <ProjectStatus props={props}/>
                    </Grid>

                    <Grid item xs={12}>
                        <CustomerList customerListData={customerListData} />
                    </Grid>
                </Grid>
            </Box>;


        </>
    )
}
