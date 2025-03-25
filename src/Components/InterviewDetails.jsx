import React from 'react';
import { Box, Typography, Link, Table, TableBody, TableCell, TableRow } from '@mui/material';

export default function InterviewDetails({ round }) {
    const { label, time, panel, videoLink } = round;

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '400px',
                margin: '16px auto',
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}>
                {label}
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Time</TableCell>
                        <TableCell sx={{ color: 'black' }}>{time}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Panel</TableCell>
                        <TableCell sx={{ color: 'black' }}>{panel}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Video conferencing link</TableCell>
                        <TableCell>
                            <Link href={videoLink} target="_blank" rel="noopener" sx={{ color: 'black' }}>
                                {videoLink}
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
}