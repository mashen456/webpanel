import { Checkbox } from "@mui/material";

import React from "react";
import BlankCheckBoxIcon from "../Components/parts/icons/BlankCheckBoxIcon.jsx";
import CheckBoxIcon from "../Components/parts/icons/CheckBoxIcon.jsx";

const AppCheckBox = props => {
  return <Checkbox {...props} disableRipple checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />} icon={<BlankCheckBoxIcon fontSize="small" color="disabled" />} />;
};

export default AppCheckBox;