import {Alert, Button, Grid, Stack, TextField} from "@mui/material";
import {Box} from "@mui/system";
import {H5} from "../Typography.jsx";
import AvatarBadge from "../avatars/AvatarBadge.jsx";
import AppAvatar from "../avatars/AppAvatar.jsx";
import AsyncSelect from "../AsyncSelect.jsx";
import * as React from "react";
import {useEffect} from "react";

// --------------------------------------------------------------

// --------------------------------------------------------------
const AddContactForm = (props) => {
    const {pb} = props.GlobalState
  const [user, setUser] = React.useState('');
  const [car, setCar] = React.useState('');
  const [standort, setStandort] = React.useState('');
  const [kennzeichen, setKennzeichen] = React.useState('');
  const [showError , setShowError] = React.useState(false);
  const [cars, setCars] = React.useState([{id: 'example', title: 'loading'}]);
  const [users, setUsers] = React.useState([{id: 'example', title: 'loading'}]);


  useEffect(() => {
    async function fetchData() {
      const carsTable = []
      const usersTable = []
      try {
        const cars = await pb.collection('cars').getFullList(10);
        const users = await pb.collection('users').getFullList(10);
        cars.map(items => {
          carsTable.push(
              {
                id: items.id,
                title: items.name,
                icon: pb.getFileUrl(items, items.icon, {'thumb': '50x50'})
              })
            })

          users.map(items => {
              usersTable.push(
                  {
                      id: items.id,
                      title: items.name,
                  })
          })
        setCars(carsTable)
        setUsers(usersTable)

        console.log("update")
      } catch (error) {
        console.log('Error:', error);
      }
    }

    pb.collection('cars').subscribe('*', fetchData)
    pb.collection('users').subscribe('*', fetchData)
    fetchData()

    return function cleanup() {
      pb.collection('users').unsubscribe();
      pb.collection('cars').unsubscribe();
    }
  }, []);

  async function createCar() {
      if (car === '' || user === '' || standort === '' ||  kennzeichen === '') {
          setShowError(true)
          return
      }
      try {
          const data = {
              "car": car,
              "owner": user,
              "standort": standort,
              "kennzeichen": kennzeichen
          };

          await pb.collection('car_list').create(data);
      } catch (e) {
          console.log(e)
      }

  }


  return <Box>
      <H5 mb={4}>Auto anlegen</H5>
          <Stack direction="row" justifyContent="center" mb={6}>
            <AvatarBadge >
              <AppAvatar src={(car.icon != null) ? (car.icon):('https://cdn.discordapp.com/attachments/1051623585128648704/1082473587019108434/image.png')} sx={{
              width: 200,
              height: 200
            }} />
            </AvatarBadge>
          </Stack>

          <Grid container spacing={3}>

            <Grid item sm={6} xs={12}>
              <AsyncSelect returnFunction={setCar} title_item='Fahrzeug'
                           list={cars} id={'select-partner'}/>
            </Grid>

            <Grid item sm={6} xs={12}>
              <AsyncSelect returnFunction={setUser} title_item='Eigentümer'
                           list={users} id={'select-partner'}/>
            </Grid>

              <Grid item sm={6} xs={12}>
              <TextField fullWidth id="outlined-basic" label="Standort" variant="outlined"
                         onChange={(event, value) => {
                             setStandort(event.target.value)
                         }
                         }/>
              </Grid>


              <Grid item sm={6} xs={12}>
                  <TextField fullWidth id="outlined-basic" label="Kennzeichen" variant="outlined"  type="number"
                             onChange={(event, value) => {
                                 setKennzeichen(event.target.value)
                             }
                             }/>
              </Grid>

              {(showError)?(<Grid item sm={12} xs={12}>
                      <Alert severity="error">ALLE FELDER MÜSSEN AUSGEFÜLLT SEIN!!!</Alert>
                  </Grid>
              ):(<></>)}


          </Grid>


        <Stack direction="row" spacing={4} mt={4}>
          <Button onClick={createCar} size="large" fullWidth  variant="contained">
            Anlegen
          </Button>

          <Button fullWidth size="large" variant="outlined" onClick={props.handleCancel}>
            Abbrechen
          </Button>
        </Stack>
    </Box>;
};

export default AddContactForm;