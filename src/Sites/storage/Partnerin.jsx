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
import {useEffect} from "react";
import * as React from "react";


export default function Partner({GlobalState}) {
    const [uebergaben, setUebergaben] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const theme = useTheme();
    const {pb} = GlobalState

    useEffect(() => {
        async function fetchData(){
            const newTable =[]
            try {
                const result = await pb.collection('uebergaben').getFullList(200,{expand:'wer,wem,item'});
                const resultItems = await pb.collection('items').getFullList(200);
                const resultClients = await pb.collection('partner').getFullList(200);
                setItems(resultItems)
                setUebergaben(result)
                setClients(resultClients)
            } catch (error) {
                console.log('Error:', error);
            }
        }
        pb.collection('uebergaben').subscribe('*', fetchData)
        pb.collection('items').subscribe('*', fetchData)
        pb.collection('partner').subscribe('*', fetchData)
        fetchData()

        return function cleanup(){
            pb.collection('uebergaben').unsubscribe();
            pb.collection('items').unsubscribe();
            pb.collection('partner').unsubscribe();
        }
    },[]);

    function getItemAmmount(item){
        for (const i of items){
            if (i.id === item){
                return i.bestand
            }
        }
    }




    let parts,colors,names,chartSeries,name,max,cahrtColors

    cahrtColors = []
    chartSeries = [];

    for (let i of clients){
        chartSeries.push({name:i.name,data: []})
        cahrtColors.push(i.color)
    }


    for (let i = 1; i< 8;i++){
        const start=Date.parse(new Date(Date.now() - i * 24 * 60 * 60 * 1000))
        const end =Date.parse(new Date(Date.now() - (i-1) * 24 * 60 * 60 * 1000))
        for (let client of chartSeries){
            let ammount = 0
            for (let uebergabe of uebergaben){
                if(Date.parse(uebergabe.date) >= start && Date.parse(uebergabe.date) <= end){
                    if (client.name == uebergabe.expand.wem.name){
                        ammount = uebergabe.menge
                    }
                }
            }
            client.data.push(ammount/50)
        }
    }



    //abgabenübersicht
    const abgabenChart={
        cahrtColors,chartSeries
    }
    //top Producer


    let newCustomerListData = []
    


    for (const data of uebergaben){
        newCustomerListData.push({
            //transaction list items
            member:data.expand.wer.nickname,
            amount:data.menge,
            avatar:data.expand.wer.avatarUrl,
            clientmember:data.angenommen_von,
            client:data.expand.wem.name,
            color:data.expand.wem.color,
            date:data.date,
            itemIcon:pb.getFileUrl(data.expand.item,data.expand.item.icon,{'thumb':'50x50'})
        })
    }

    let total_sold =0;
    let k_seeds_total =0;
    let ammount =0;


    parts=[]
    names=[]
    colors=[]

    for (const client of clients){
        total_sold = total_sold + client.k_total
        k_seeds_total = k_seeds_total + client.k_seeds_today
        if (client.k_total > ammount){
            name = client.name
            ammount = client.k_total
        }
        parts.push(client.k_total)
        names.push(client.name)
        colors.push(client.color)
    }


    max = total_sold/50
    ammount = ammount/50

    const topProducer={
        name,ammount,max
    }

    //anteile gangs
    const props={
        parts,colors,names
    }

    const list1 = [{
        id: 1,
        amount: '800.000 $',
        Icon: MoneyIcon,
        title: "kumulierte Einnahmen",
        color: '#1dff00'
    }, {
        id: 2,
        amount: getItemAmmount('5c8c20sush11zt8'),
        Icon: CloudIcon,
        title: "Pakete auf Lager",
        color: theme.palette.info.main
    }, {
        id: 3,
        amount: getItemAmmount('ybfhsm47w9vunxo'),
        Icon: HourGlassIcon,
        title: "Tüten zu verarbeiten",
        color: theme.palette.text.disabled
    }];

    const list2 = [{
        id: 1,
        amount: getItemAmmount('v1draaak65jxsoo'),
        Icon: LocalShippingIcon,
        title: "Kokasamen im Lager",
        color: theme.palette.primary.main
    }, {
        id: 2,
        amount: k_seeds_total,
        Icon: UserBigIcon,
        title: "Kokasamen im Umlauf",
        color: theme.palette.warning.main
    }, {
        id: 3,
        amount: total_sold/50,
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
                        <CustomerList customerListData={newCustomerListData} />
                    </Grid>

                </Grid>
            </Box>


        </>
    )
}
