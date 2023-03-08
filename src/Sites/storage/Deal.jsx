import Paper from "@mui/material/Paper";
import {H2} from "../../SubComponents/Typography.jsx";
import Grid from "@mui/material/Grid";
import AsyncSelect from "../../SubComponents/AsyncSelect.jsx";
import * as React from "react";
import {useEffect} from "react";
import {Alert, Button, ButtonGroup, Card, Stack, TextField, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useNavigate} from "react-router-dom";



const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

Item.propTypes = {children: PropTypes.node};
export default function Deal({GlobalState}) {
    const [item, setItem] = React.useState('');
    const [partner, setPartner] = React.useState('');
    const [client, setClient] = React.useState('');
    const [date, setDate] = React.useState('');
    const [bemerkung, setBemerkung] = React.useState('');
    const [amount, setAmount] = React.useState();
    const [price, setPrice] = React.useState();
    const [list_items, setList_items] = React.useState([{id: 'example', title: 'loading'}]);
    const [list_partner, setList_partner] = React.useState([{id: 'example', title: 'loading'}]);
    const {pb} = GlobalState
    const [luser,setlUser] = React.useState(JSON.parse(window.localStorage.getItem('user')));
    let navigate = useNavigate();

    const theme = useTheme();


    useEffect(() => {
        async function fetchData() {
            const newTable = []
            const partnerTable = []
            try {
                const result = await pb.collection('items').getFullList(20);
                const resultPartner = await pb.collection('partner').getFullList(5);
                result.map(items => {
                    newTable.push(
                        {
                            id: items.id,
                            title: items.name,
                            icon: pb.getFileUrl(items, items.icon, {'thumb': '50x50'})
                        })
                    console.log(pb.getFileUrl(items, items.icon, {'thumb': '50x50'}))
                })
                resultPartner.map(p => {
                    partnerTable.push({
                        id: p.id,
                        title: p.name,
                        color: p.color,
                    })
                })


                setList_partner(partnerTable)
                setList_items(newTable)
                console.log("update")
            } catch (error) {
                console.log('Error:', error);
            }
        }

        pb.collection('items').subscribe('*', fetchData)
        fetchData()

        return function cleanup() {
            pb.collection('items').unsubscribe();
        }
    }, []);



    async function createUebergabe() {
        const data = {
            "item": item.id,
            "menge": amount,
            "wer": luser.record.id,
            "wem": partner.id,
            "angenommen_von": client,
            "date": date
        };

        try{
            const record = await pb.collection('uebergaben').create(data);

            const itemAmmount = await pb.collection('items').getOne(item.id);

            const updateData = {
                "bestand": (itemAmmount.bestand+amount)
            };

            await pb.collection('items').update(item.id, updateData);


            //koks
            if (item.id === 'ybfhsm47w9vunxo'){

                const partner2 = await pb.collection('partner').getOne(partner.id);
                const k_today = (parseInt(partner2.k_today) + parseInt(amount))
                const k_total = (parseInt(partner2.k_total) + parseInt(amount))

                const data = {
                    "k_total": k_total,
                    "k_today": k_today,
                };
                await pb.collection('partner').update(partner.id, data);
            }

            //kokssamen
            if (item.id === 'v1draaak65jxsoo'){

                const partner2 = await pb.collection('partner').getOne(partner.id);
                const k_seeds_today = (parseInt(partner2.k_seeds_today) - parseInt(amount))
                const k_seeds_total = (parseInt(partner2.k_seeds_total) - parseInt(amount))

                const data = {
                    "k_seeds_total":parseInt(k_seeds_total),
                    "k_seeds_today": parseInt(k_seeds_today),
                };
                await pb.collection('partner').update(partner.id, data);

            }


            navigate("/storage/k_dashboard")

        }catch (e) {
            alert('Die Übergabe konnte nicht eingetragen werden. Sind alle felder ausgefüllt?')
            console.log(e)
        }
    }


    async function createAbgabe() {
        const data = {
            "item": item.id,
            "menge": -amount,
            "wer": luser.record.id,
            "wem": partner.id,
            "angenommen_von": client,
            "date": date
        };

        console.log(data)

        try {
            const record = await pb.collection('uebergaben').create(data);

            const itemAmmount = await pb.collection('items').getOne(item.id);

            const updateData = {
                "bestand": (itemAmmount.bestand - amount)
            };

            await pb.collection('items').update(item.id, updateData);


            //koks
            if (item.id === 'ybfhsm47w9vunxo') {

                const partner2 = await pb.collection('partner').getOne(partner.id);
                const k_today = (parseInt(partner2.k_today) - parseInt(amount))
                const k_total = (parseInt(partner2.k_total) - parseInt(amount))

                const data = {
                    "k_total":parseInt(k_total),
                    "k_today": parseInt(k_today),
                };
                await pb.collection('partner').update(partner.id, data);
            }

            //kokssamen
            if (item.id === 'v1draaak65jxsoo'){
                const partner2 = await pb.collection('partner').getOne(partner.id);
                const k_seeds_today = (parseInt(partner2.k_seeds_today) + parseInt(amount))
                const k_seeds_total = (parseInt(partner2.k_seeds_total) + parseInt(amount))
                const data = {
                    "k_seeds_total":parseInt(k_seeds_total),
                    "k_seeds_today": parseInt(k_seeds_today),
                };
                await pb.collection('partner').update(partner.id, data);

            }
            navigate("/storage/k_dashboard")

        } catch (e) {
            alert('Die Übergabe konnte nicht eingetragen werden. Sind alle felder ausgefüllt?')
            console.log(e)
        }
    }


    async function createSell(payed) {

        try {

            const itemAmmount = await pb.collection('items').getOne(item.id);

            const updateData = {
                "bestand": (parseInt(itemAmmount.bestand) + parseInt(amount))
            };

            await pb.collection('items').update(item.id, updateData);

            const data = {
                "item": item.id,
                "amount": -amount,
                "payed": payed,
                "wer": luser.record.id,
                "von_wem": client,
                "bemerkung": bemerkung,
                "date": date
            };

            await pb.collection('kasse').create(data);

            navigate("/storage/k_dashboard")

        } catch (e) {
            alert('Der Ankauf konnte nicht eingetragen werden. Sind alle felder ausgefüllt?')
            console.log(e)
        }
    }

    async function createBuy(payed) {

        try {

            const itemAmmount = await pb.collection('items').getOne(item.id);

            const updateData = {
                "bestand": (parseInt(itemAmmount.bestand) - parseInt(amount))
            };

            await pb.collection('items').update(item.id, updateData);

            const data = {
                "item": item.id,
                "amount": amount,
                "payed": payed,
                "wer": luser.record.id,
                "von_wem": client,
                "bemerkung": bemerkung,
                "date": date
            };

            await pb.collection('kasse').create(data);

            navigate("/storage/k_dashboard")

        } catch (e) {
            alert('Der Ankauf konnte nicht eingetragen werden. Sind alle felder ausgefüllt?')
            console.log(e)
        }
    }



    return (
        <>
            <Box pt={2} pb={4}>

                <Grid container spacing={3}>


                    <Grid item md={6} xs={12}>
                        <Card sx={{
                            padding: 3,
                            height: "100%"
                        }}>
                        <Box sx={{ width: '100%' }}>
                        <Stack
                            direction="column"
                            justifyContent="space-around"
                            alignItems="stretch"
                            spacing={0}
                        >
                            <Item>
                                <H2>
                                    Partner Annahme
                                </H2>
                            </Item>
                            <Item>
                                <AsyncSelect returnFunction={setItem} title_item='Was wird übergeben?'
                                             list={list_items}
                                             id={'select-items'}/>
                            </Item>
                            <Item>
                                <AsyncSelect returnFunction={setPartner} title_item='Von welchem Partner?'
                                             list={list_partner} id={'select-partner'}/>
                            </Item>
                            <Item>
                                <TextField fullWidth id="outlined-basic" label="Wer Übergibt das Item?" variant="outlined"
                                           onChange={(event, value) => {
                                               setClient(event.target.value)
                                           }
                                           }/>
                            </Item>
                            <Item>
                                <TextField
                                    fullWidth
                                    id="outlined-number"
                                    label="Wie viel?"
                                    type="number"
                                    onChange={(event) => {
                                        setAmount(event.target.value)
                                    }
                                    }
                                />
                            </Item>

                            <Item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{width:'100%'}}
                                        onChange={(value)=>{
                                            setDate(value)
                                        }
                                        }
                                    />
                                </LocalizationProvider>
                            </Item>

                            <Item>
                                <Button fullWidth variant="contained" onClick={createUebergabe}>Annehmen</Button>
                            </Item>

                        </Stack>
                        </Box>
                        </Card>
                    </Grid>


                    <Grid item md={6} xs={12}>
                        <Card sx={{
                            padding: 3,
                            height: "100%"
                        }}>
                            <Box sx={{ width: '100%' }}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    spacing={0}
                                >
                                    <Item>
                                        <H2>
                                            Partner Abgabe
                                        </H2>
                                    </Item>
                                    <Item>
                                        <AsyncSelect returnFunction={setItem} title_item='Was wird übergeben?'
                                                     list={list_items}
                                                     id={'select-items'}/>
                                    </Item>
                                    <Item>
                                        <AsyncSelect returnFunction={setPartner} title_item='An welchem Partner?'
                                                     list={list_partner} id={'select-partner'}/>
                                    </Item>
                                    <Item>
                                        <TextField fullWidth id="outlined-basic" label="Wer bekommt das Item?" variant="outlined"
                                                   onChange={(event, value) => {
                                                       setClient(event.target.value)
                                                   }
                                                   }/>
                                    </Item>
                                    <Item>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Wie viel?"
                                            type="number"
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }
                                            }
                                        />
                                    </Item>
                                    <Item>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{width:'100%'}}
                                                onChange={(value)=>{
                                                    setDate(value)
                                                }
                                                }
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                    <Item>
                                        <Button onClick={createAbgabe} fullWidth variant="contained">Abgeben</Button>
                                    </Item>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>


                    <Grid item md={6} xs={12}>
                        <Card sx={{
                            padding: 3,
                            height: "100%"
                        }}>
                            <Box sx={{ width: '100%' }}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    spacing={0}
                                >
                                    <Item>
                                        <H2>
                                            Item Ankauf
                                        </H2>
                                    </Item>
                                    <Item>
                                        <AsyncSelect returnFunction={setItem} title_item='Was wird angekauft?'
                                                     list={list_items}
                                                     id={'select-items'}/>
                                    </Item>

                                    <Item>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Wie viel?"
                                            type="number"
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }
                                            }
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Zu welchem Preis?"
                                            type="number"
                                            onChange={(event) => {
                                                setPrice(event.target.value)
                                            }
                                            }
                                        />
                                    </Item>
                                    <Item>
                                    <TextField fullWidth id="outlined-basic" label="Von wem?" variant="outlined"
                                               onChange={(event, value) => {
                                                   setClient(event.target.value)
                                               }
                                               }/>
                                    </Item>
                                    <Item>
                                    <TextField fullWidth id="outlined-basic" label="Bemerkung" variant="outlined"
                                               onChange={(event, value) => {
                                                   setBemerkung(event.target.value)
                                               }
                                               }/>
                                    </Item>
                                    <Item>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{width:'100%'}}
                                                onChange={(value)=>{
                                                    setDate(value)
                                                }
                                                }
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                    <Item>
                                        <ButtonGroup
                                            disableElevation
                                            fullWidth
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button onClick={()=>{
                                                createSell(true)
                                            }} >
                                                Ankauf aus der Familienkasse
                                            </Button>

                                            <Button onClick={()=>{
                                            createSell(false)
                                            }
                                            }>
                                                Ankauf ausgelegt
                                            </Button>
                                        </ButtonGroup>
                                    </Item>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>


                    <Grid item md={6} xs={12}>
                        <Card sx={{
                            padding: 3,
                            height: "100%"
                        }}>
                            <Box sx={{ width: '100%' }}>
                                <Stack
                                    direction="column"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    spacing={0}
                                >
                                    <Item>
                                        <H2>
                                            Item Verkauf
                                        </H2>
                                    </Item>
                                    <Item>
                                        <AsyncSelect returnFunction={setItem} title_item='Was wird verkaut?'
                                                     list={list_items}
                                                     id={'select-items'}/>
                                    </Item>

                                    <Item>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Wie viel?"
                                            type="number"
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }
                                            }
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Zu welchem Preis?"
                                            type="number"
                                            onChange={(event) => {
                                                setPrice(event.target.value)
                                            }
                                            }
                                        />
                                    </Item>
                                    <Item>
                                        <TextField fullWidth id="outlined-basic" label="An wem?" variant="outlined"
                                                   onChange={(event, value) => {
                                                       setClient(event.target.value)
                                                   }
                                                   }/>
                                    </Item>
                                    <Item>
                                        <TextField fullWidth id="outlined-basic" label="Bemerkung" variant="outlined"
                                                   onChange={(event, value) => {
                                                       setBemerkung(event.target.value)
                                                   }
                                                   }/>
                                    </Item>
                                    <Item>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{width:'100%'}}
                                                onChange={(value)=>{
                                                    setDate(value)
                                                }
                                                }
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                    <Item>
                                        <ButtonGroup
                                            disableElevation
                                            fullWidth
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button onClick={()=>{
                                                createBuy(true)
                                            }} >
                                                Verkauf in die Familienkasse
                                            </Button>

                                            <Button onClick={()=>{
                                                createBuy(false)
                                            }
                                            }>
                                                Verkauf verrechnen
                                            </Button>
                                        </ButtonGroup>
                                    </Item>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>


                </Grid>
            </Box>
        </>
    )
}