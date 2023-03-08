import {Button, styled} from "@mui/material";

import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "../../flexbox/FlexBetween.jsx";
import SearchInput from "../../input-fields/SearchInput.jsx";
import FlexBox from "../../flexbox/FlexBox.jsx";
import {H6} from "../../Typography.jsx";

const SecondaryWrapper = styled(FlexBetween)(({
  theme
}) => ({
  gap: 8,
  flexWrap: "wrap",
  margin: "24px 0",
  [theme.breakpoints.down(550)]: {
    "& .MuiInputBase-root": {
      maxWidth: "calc(100% - 90px)"
    }
  }
})); // --------------------------------------------------------------------

// --------------------------------------------------------------------
const SearchArea = ({
  value,
  onChange,
  setValue,
  selectedItems,
  gridRoute,
  listRoute
}) => {
  const navigate = useNavigate();
  const {
    pathname
  } = useLocation();

  const activeColor = path => pathname === path ? "primary.main" : "text.disabled";

  return <SecondaryWrapper>
      <SearchInput placeholder="Search..." value={value || ""} onChange={e => {
      if (onChange && setValue) {
        setValue(e.target.value);
        onChange(e.target.value);
      }

      onChange(e.target.value);
    }} />

      <FlexBox alignItems="center" gap={1}>
        {selectedItems && selectedItems.length > 0 && <FlexBox alignItems="center" gap={1}>
            <H6>{selectedItems.length} Selected</H6>
            <Button variant="contained" color="error">
              Delete Selected
            </Button>
          </FlexBox>}


      </FlexBox>
    </SecondaryWrapper>;
};

export default SearchArea;