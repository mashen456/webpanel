import {Button, Card, IconButton, Stack} from "@mui/material";
import {Box} from "@mui/system";

import {useState} from "react";
import AddContactForm from "./AddContactForm";
import AppModal from "../AppModal.jsx";
import FlexBetween from "../flexbox/FlexBetween.jsx";
import {Add, Edit, Info, People} from "@mui/icons-material";
import MoreHorizontal from "../../Components/parts/icons/MoreHorizontal.jsx";
import AppAvatar from "../avatars/AppAvatar.jsx";
import {H4, H5, Small, Tiny} from "../Typography.jsx";
import User from "../../Components/parts/icons/User.jsx";
import MapIcon from '@mui/icons-material/Map';
import KeyIcon from "@mui/icons-material/Key";
import InventoryIcon from '@mui/icons-material/Inventory';


// --------------------------------------------------

// --------------------------------------------------

export default function ContactDetails(props){
  const [openModal, setOpenModal] = useState(false);
    const {pb, setPb,user,setUser} = props.GlobalState

  const handleCloseModal = () => setOpenModal(false);

  return <Card sx={{
    padding: 3,
    height: "100%",
    backgroundColor: "action.hover"
  }}>
      <Button fullWidth variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)}>
        Auto hinzufügen
      </Button>

      <AppModal open={openModal} handleClose={handleCloseModal}>
        <AddContactForm handleCancel={handleCloseModal} GlobalState={props.GlobalState} />
      </AppModal>

      <FlexBetween mt={4}>
        <IconButton>
          <Edit sx={{
          color: "text.disabled"
        }} />
        </IconButton>

        <IconButton>
          <MoreHorizontal sx={{
          color: "text.disabled"
        }} />
        </IconButton>
      </FlexBetween>

      <Stack alignItems="center">
        <AppAvatar  src={props.data.avatar} sx={{
        width: 120,
        height: 120,
        backgroundColor: "white"
      }} />
        <H5 mt={2}>{props.data.name}</H5>
        <Tiny mt={0.5}>{props.data.position}</Tiny>
      </Stack>

      <Box mt={4}>

        <ListItem Icon={User}  title={"Besitzer:"} text={props.data.owner} />


        <ListItem Icon={Info} title="ID:" text={props.data.ownerId} />
        <ListItem Icon={MapIcon} title="Standort:" text={props.data.standort} />
        <ListItem Icon={People} title="Sitzplätze:" text={props.data.sitzplaetze} />
        <ListItem Icon={InventoryIcon} title="Kofferraum:" text={props.data.kofferraum} />

      </Box>
      <Box mt={2}>
      {props.data.kopieschluessel != null ? (
          props.data.kopieschluessel.map(item=>{
          return (
            <ListItem Icon={KeyIcon} text={item.nickname} />
          )
      })):(<ListItem Icon={KeyIcon} text="Keine Kopieschlüssel vorhanden" />)}
      </Box>
   </Card>;
}; // ----------------------------------------


// ----------------------------------------
function ListItem({
  Icon,
  title,
    text

}) {
  return <Stack direction="row" spacing={1.5} pb={2} alignItems="center">
      {Icon != null ? (
      <Icon sx={{
      color: "text.disabled",
      fontSize: 20
    }} />) : (<></>)}
      <Small fontSize={12}>{title}</Small>
      <H4>{text}</H4>
    </Stack>;
}