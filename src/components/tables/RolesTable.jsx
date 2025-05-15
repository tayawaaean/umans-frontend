
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import RoleRow from "./RoleRow";

const RolesTable = ({roles, apps, users, userTypes, loadingRowId }) => {

  return (
    <TableContainer sx={{ maxWidth: '100%', margin: "auto", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Actions</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>App Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>User</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Created at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map(role => (
                <RoleRow key={role.id } role={role} users={users} apps={apps} userTypes={userTypes} loadingRowId={loadingRowId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
};

export default RolesTable;