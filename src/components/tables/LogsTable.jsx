import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Box, Typography,   Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PrettyJsonText = ({ jsonString }) => {
    return (
      <SyntaxHighlighter language="json" style={docco}>
        {jsonString}
      </SyntaxHighlighter>
    );
};

const CollapsibleJsonTableCell = ({ jsonData }) => {
    return (
      <Accordion sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography >View JSON</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PrettyJsonText jsonString={JSON.stringify(JSON.parse(jsonData), null, 2)} />
        </AccordionDetails>
      </Accordion>
    );
  };

const LogsTable = ({logs, apps, users, userTypes}) => {

    const userMap = users.reduce((acc, user) => {
        acc[user.id] = `${user.firstName} ${user.lastName}`;
        return acc;
    }, {});

    return (
        <TableContainer sx={{ margin: "auto", mt: 4 }}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Action</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Payload</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Doer</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Affected ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Target Model</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Ip Address</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Timestamp</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {logs.map(log => (
                        <TableRow key={log.id}>
                            <TableCell align="center">{log.action}</TableCell>
                            <TableCell sx={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <CollapsibleJsonTableCell jsonData={log.details} />
                            </TableCell>
                            <TableCell align="center">{userMap[log.userId] || "Unknown"}</TableCell>
                            <TableCell align="center">{log.targetId || '—'}</TableCell>
                            <TableCell align="center">{log.targetType || '—'}</TableCell>
                            <TableCell align="center">{log.ipAddress || '—'}</TableCell>
                            <TableCell align="center">{new Date(log.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                })}</TableCell>
                            
                            
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    );
};

export default LogsTable;