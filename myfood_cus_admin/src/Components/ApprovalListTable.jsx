import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function createData(name, contact_no, address, address_proof, address_proof_att, alt_contact_no, status) {
    return { name, contact_no, address, address_proof, address_proof_att, alt_contact_no, status };
}

const rows = [
    createData('TestVendor1', 9898989898, 'H.no:34, Kphb, Hyderabad', 'Aadhar', 'Yes', 9382787070, 'Pending'),
    createData('TestVendor2', 7898679898, 'H.no:34, Kphb, Hyderabad', 'Aadhar', 'Yes', 7328748070, 'Approved'),
    createData('TestVendor3', 7346679898, 'H.no:34, Kphb, Hyderabad', 'Aadhar', 'Yes', 9974107070, 'Pending'),
    createData('TestVendor4', 8123412298, 'H.no:34, Kphb, Hyderabad', 'Aadhar', 'Yes', 8472437070, 'Pending'),
    createData('TestVendor5', 9898121231, 'H.no:34, Kphb, Hyderabad', 'Aadhar', 'Yes', 7070017319, 'Approved'),
];

const ApprovalListTable = () => {
    return (
        <>
            <h2>List of Vendors</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">contact_no</TableCell>
                            <TableCell align="right">address</TableCell>
                            <TableCell align="right">address_proof</TableCell>
                            <TableCell align="right">address_proof_att</TableCell>
                            <TableCell align="right">alt_contact_no</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.contact_no}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.address_proof}</TableCell>
                                <TableCell align="right">{row.address_proof_att}</TableCell>
                                <TableCell align="right">{row.alt_contact_no}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ApprovalListTable;