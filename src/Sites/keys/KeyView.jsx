import { Box, Card, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {searchByName} from "../../SubComponents/utils/utils.js";
import FlexBetween from "../../SubComponents/flexbox/FlexBetween.jsx";
import AppAvatar from "../../SubComponents/avatars/AppAvatar.jsx";
import {H6, Tiny} from "../../SubComponents/Typography.jsx";
import MoreVertical from "../../Components/parts/icons/MoreVertical.jsx";
import AppPagination from "../../SubComponents/AppPagination.jsx";
import ContactDetails from "../../SubComponents/contact-list/ContactDetails.jsx";
import SearchArea from "../../SubComponents/admin-ecommerce/product-list/search-area.jsx";


export default function KeyView({GlobalState}){
  const {pb} = GlobalState
  pb.autoCancellation(false);
  const [CONTACT_LIST,setCONTACT_LIST] = useState([    {
    "id": "j7yvq67483m5iwn",
    "avatar": "http://127.0.0.1:8090/api/files/t8s8sdw2q8je0hb/wne27qj4kz66wn2/07a4fd9957_jugular_l9JToecKZY.png?thumb=50x50",
    "name": "Jugular",
    "position": "XPATRONX",
    "kennzeichen": "XPATRONX",
    "kofferraum": "60",
    "sitzplaetze": 4,
    "standort": "Hood",
    "kopieschluessel": [
      {
        "avatar": "",
        "avatarUrl": "https://cdn.discordapp.com/avatars/158332580972855296/674370eb6245e54724bf53373304a06a.png",
        "collectionId": "_pb_users_auth_",
        "collectionName": "users",
        "created": "2023-03-02 16:03:18.284Z",
        "dcID": "158332580972855296",
        "email": "hartmann456@gmail.com",
        "emailVisibility": false,
        "fullname": "nils#9016",
        "id": "s7biuugs7veccp7",
        "ingameId": "16420",
        "kontonummer": "464654654654",
        "member": true,
        "name": "nils",
        "nickname": "Hefe",
        "perms": 99,
        "telefon": "013377619437",
        "updated": "2023-03-07 17:09:39.007Z",
        "username": "nils",
        "verified": true
      },
      {
        "avatar": "5image_hO6VQMJ1Pi.png",
        "avatarUrl": "https://cdn.discordapp.com/emojis/777195208399257622.gif?size=96&quality=lossless",
        "collectionId": "_pb_users_auth_",
        "collectionName": "users",
        "created": "2023-03-05 05:23:20.622Z",
        "dcID": "",
        "emailVisibility": false,
        "fullname": "",
        "id": "78pap0lvmhhhgvu",
        "ingameId": "",
        "kontonummer": "",
        "member": false,
        "name": "soul",
        "nickname": "soul",
        "perms": 10,
        "telefon": "",
        "updated": "2023-03-05 19:44:40.619Z",
        "username": "soul",
        "verified": true
      }
    ],
    "owner": "Hefe V2",
    "ownerAvatar": "https://cdn.discordapp.com/avatars/1045990804180713543/aa32f0f59751ce49175dd3181e3a8ab8.png",
    "ownerId": ""
  },
    {
      "id": "rug7x4as3hvvwrv",
      "avatar": "http://127.0.0.1:8090/api/files/t8s8sdw2q8je0hb/awqro5dbytytjoh/gta_mag_krieger_762810_oNvYvXzrPE.jpg?thumb=50x50",
      "name": "Krieger",
      "position": "BWSUCKS",
      "kennzeichen": "BWSUCKS",
      "kofferraum": "60",
      "sitzplaetze": 2,
      "standort": "605",
      "kopieschluessel": [
        {
          "avatar": "5image_hO6VQMJ1Pi.png",
          "avatarUrl": "https://cdn.discordapp.com/emojis/777195208399257622.gif?size=96&quality=lossless",
          "collectionId": "_pb_users_auth_",
          "collectionName": "users",
          "created": "2023-03-05 05:23:20.622Z",
          "dcID": "",
          "emailVisibility": false,
          "fullname": "",
          "id": "78pap0lvmhhhgvu",
          "ingameId": "",
          "kontonummer": "",
          "member": false,
          "name": "soul",
          "nickname": "soul",
          "perms": 10,
          "telefon": "",
          "updated": "2023-03-05 19:44:40.619Z",
          "username": "soul",
          "verified": true
        }
      ],
      "owner": "Hefe V2",
      "ownerAvatar": "https://cdn.discordapp.com/avatars/1045990804180713543/aa32f0f59751ce49175dd3181e3a8ab8.png",
      "ownerId": ""
    },
    {
      "id": "xp0ob0y00p6oim7",
      "avatar": "http://127.0.0.1:8090/api/files/t8s8sdw2q8je0hb/iuumz4bk5rqqpv8/maxresdefault_HA6XDUoXk5.jpg?thumb=50x50",
      "name": "Sultan Clasic",
      "position": "OWBISFINE",
      "kennzeichen": "OWBISFINE",
      "kofferraum": "60",
      "sitzplaetze": 4,
      "standort": "605",
      "kopieschluessel": [
        {
          "avatar": "",
          "avatarUrl": "https://cdn.discordapp.com/avatars/1045990804180713543/aa32f0f59751ce49175dd3181e3a8ab8.png",
          "collectionId": "_pb_users_auth_",
          "collectionName": "users",
          "created": "2023-03-05 05:00:40.072Z",
          "dcID": "1045990804180713543",
          "emailVisibility": false,
          "fullname": "Hefe V2#3758",
          "id": "xfz716ljmjx5yqb",
          "ingameId": "",
          "kontonummer": "",
          "member": false,
          "name": "Hefe V2",
          "nickname": "Hefe Main",
          "perms": 99,
          "telefon": "",
          "updated": "2023-03-05 19:47:02.821Z",
          "username": "users81747",
          "verified": true
        }
      ],
      "owner": "nils",
      "ownerAvatar": "https://cdn.discordapp.com/avatars/158332580972855296/674370eb6245e54724bf53373304a06a.png",
      "ownerId": "16420"
    }])

  const [selectedItem, setSelectedItem] = useState(CONTACT_LIST[1]); // search input

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = value => setSearchValue(value); // handle select


  const handleSelectItem = id => setSelectedItem(CONTACT_LIST[id]); // active select item


  const activeItem = id => selectedItem.id === id;

  const [filteredItem, setFilteredItem] = useState(CONTACT_LIST);

  useEffect(() => {
    const result = searchByName(CONTACT_LIST, searchValue);
    setFilteredItem(result);
  }, [searchValue]);

  useEffect(() => {
    async function fetchData() {
      const cars = []
      try {
        const result = await pb.collection('car_list').getFullList(20, {expand:'car,owner,kopieschluessel,standort'});
        result.map(items => {
          cars.push(
              {
                id: items.id,
                avatar: pb.getFileUrl(items.expand.car, items.expand.car.icon, {'thumb': '50x50'}),
                name:items.expand.car.name,
                position:items.kennzeichen,

                kennzeichen:items.kennzeichen,
                kofferraum:items.expand.car.kofferraum,
                sitzplaetze:items.expand.car.sitzplaetze,
                standort:items.standort,
                kopieschluessel:items.expand.kopieschluessel,
                owner:items.expand.owner.name,
                ownerAvatar:items.expand.owner.avatarUrl,
                ownerId:items.expand.owner.ingameId,
              })

        })
        setCONTACT_LIST(cars)
        setFilteredItem(cars)
        console.log(cars)
        console.log("update")
      } catch (error) {
        console.log('Error:', error);
      }
    }

    pb.collection('car_list').subscribe('*', fetchData)
    pb.collection('cars').subscribe('*', fetchData)
    fetchData()

    return function cleanup() {
      pb.collection('car_list').unsubscribe();
      pb.collection('cars').unsubscribe();
    }
  }, []);


  return <Box pt={2} pb={4}>
      <Grid container>
        <Grid item lg={9} md={8} xs={12}>
          <Card sx={{
          px: 3,
          height: "100%"
        }}>
            <SearchArea value={searchValue} onChange={handleSearch} />

            <Grid container spacing={3}>
              {filteredItem.map((item, index) => <Grid item lg={4} sm={6} xs={12} key={index}>
                  <Box onClick={() => handleSelectItem(index)} sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                padding: 2,
                cursor: "pointer",
                transition: "all 0.4s",
                backgroundColor: activeItem(item.id) ? "primary.main" : "transparent"
              }}>
                    <FlexBetween>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AppAvatar src={item.avatar} sx={{
                      borderRadius: "20%"
                    }} />
                        <Box>
                          <H6 fontSize={12} color={activeItem(item.id) ? "white" : "text.primary"}>
                            {item.name}
                          </H6>
                          <Tiny color={activeItem(item.id) ? "white" : "text.secondary"} fontSize={12}>
                            {item.position}
                          </Tiny>
                        </Box>
                      </Stack>

                      <IconButton sx={{
                    padding: 0
                  }}>
                        <MoreVertical sx={{
                      fontSize: 18,
                      color: activeItem(item.id) ? "white" : "text.disabled"
                    }} />
                      </IconButton>
                    </FlexBetween>
                  </Box>
                </Grid>)}

              <Grid item xs={12}>
                <Stack alignItems="center" marginY={2}>
                  <AppPagination shape="rounded" count={4} />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} xs={12}>
          <ContactDetails data={selectedItem} GlobalState={GlobalState}/>
        </Grid>
      </Grid>
    </Box>;
};

