import { Box, Card, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CONTACT_LIST from "../../SubComponents/__fakeData__/user-and-contact/contact-list.js";
import {searchByName} from "../../SubComponents/utils/utils.js";
import FlexBetween from "../../SubComponents/flexbox/FlexBetween.jsx";
import AppAvatar from "../../SubComponents/avatars/AppAvatar.jsx";
import {H6, Tiny} from "../../SubComponents/Typography.jsx";
import MoreVertical from "../../Components/parts/icons/MoreVertical.jsx";
import AppPagination from "../../SubComponents/AppPagination.jsx";
import ContactDetails from "../../SubComponents/contact-list/ContactDetails.jsx";
import SearchArea from "../../SubComponents/admin-ecommerce/product-list/search-area.jsx";


const KeyView = () => {
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

  console.log(CONTACT_LIST)

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
          <ContactDetails data={selectedItem} />
        </Grid>
      </Grid>
    </Box>;
};

export default KeyView;