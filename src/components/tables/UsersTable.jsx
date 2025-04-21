
import { useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import UserRow from "./UserRow";

const UsersTable = ({users, loadingRowId}) => {

  //const users = useSelector((state) => state.users.users);
  
  
  console.log("rendering")
  return(
    <TableContainer sx={{ maxWidth: '100%', margin: "auto", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Actions</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>First Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Office</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Mobile No.</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Joined at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user  => (
                <UserRow key={user.id} user={user} loadingRowId={loadingRowId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
};

export default UsersTable;