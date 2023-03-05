import { Edit } from "@mui/icons-material";
import { Card, IconButton, Stack, styled, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import AppCheckBox from "components/AppCheckBox";
// import AppAvatar from "components/avatars/AppAvatar";
// import Scrollbar from "components/ScrollBar";
// import { H5, Tiny } from "components/Typography";
import { useState } from "react";
import TableHeader from "./TableHeader";
import Scrollbar from "../../../SubComponents/ScrollBar.jsx";
import {H5, Tiny} from "../Typography.jsx";
import AppCheckBox from "../../../SubComponents/AppCheckBox.jsx";
import AppAvatar from "../../../SubComponents/avatars/AppAvatar.jsx";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const tableHeading = [{
  id: "member",
  label: "Angenommen Von:",
  alignRight: false
}, {
  id: "client",
  label: "Partner",
  alignRight: false
}, {
  id: "clientmember",
  label: "Übergeben von:",
  alignRight: false
}, {
  id: "amount",
  label: "Menge",
  alignRight: false
}, {
  id: "edit",
  label: "Edit",
  alignRight: true
}]; // list data

 // styled components

const StyledTableCell = styled(TableCell)(() => ({
  paddingTop: 10,
  paddingBottom: 10
}));

export default function CustomerList({customerListData}){

  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("member");
  const [order, setOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = customerListData.map(n => n.member);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleClick = member => {
    const selectedIndex = selected.indexOf(member);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, member);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = stableSort(customerListData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return <Card sx={{
    padding: 3
  }}>
      <H5 mb={2}>Customer List</H5>

      <Scrollbar>
        <TableContainer sx={{
        minWidth: 800
      }}>
          <Table>
            <TableHeader order={order} orderBy={orderBy} heading={tableHeading} numSelected={selected.length} onRequestSort={handleRequestSort} rowCount={customerListData.length} onSelectAllClick={handleSelectAllClick} />
            <TableBody>
              {filteredUsers.map((row, index) => {
              const {
                member,
                amount,
                clientmember,
                client,
                avatar
              } = row;
              const isItemSelected = selected.indexOf(member) !== -1;
              return <TableRow key={index} tabIndex={-1} amount="checkbox" selected={isItemSelected} aria-checked={isItemSelected} sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent"
                }
              }}>
                    <StyledTableCell padding="checkbox">
                      <AppCheckBox checked={isItemSelected} onClick={() => handleClick(member)} />
                    </StyledTableCell>

                    <StyledTableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <AppAvatar alt={member} src={avatar} />
                        <Tiny fontWeight={600} color="text.primary">
                          {member}
                        </Tiny>
                      </Stack>
                    </StyledTableCell>

                    <StyledTableCell align="left">{client}</StyledTableCell>
                    <StyledTableCell align="left">{clientmember}</StyledTableCell>
                    <StyledTableCell align="left">{amount}</StyledTableCell>

                    <StyledTableCell align="right">
                      <IconButton>
                        <Edit sx={{
                      color: "text.disabled"
                    }} />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>;
            })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination page={page} component="div" rowsPerPage={rowsPerPage} count={customerListData.length} rowsPerPageOptions={[5, 10, 25]} onPageChange={(_, page) => setPage(page)} onRowsPerPageChange={_ => handleChangeRowsPerPage} />
    </Card>;
};

