
import { useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import SessionsRow from "./SessionsRow";

const SessionsTable = ({sessions, apps, users,}) => {

  //const apps = useSelector((state) => state.apps.apps);
  return (
    <TableContainer sx={{ maxWidth: '100%', margin: "auto", mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Actions</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Token</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>User</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>App</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Expires At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map(session => (
                <SessionsRow key={session.id } session={session} users={users} apps={apps} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
};

export default SessionsTable;