import React from 'react';
import {Dropdown, Spinner, Stack} from 'react-bootstrap';
import {microAlgosToString, truncateAddress} from '../utils/conversions';
import Identicon from './utils/Identicon'
import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";
import { Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Wallet = ({address, name, amount, points_given , points_received , symbol, disconnect, algoImg}) => {
    if (!address) {
        return null;
    }
    return (
        <>
            <Dropdown style = {{display: "flex", flexDirection: "row", gap: "1rem", paddingRight: "1rem"}}>
                <Dropdown.Toggle variant="light" align="end" id="dropdown-basic"
                                 className="d-flex align-items-center border rounded-pill py-1">
                    {amount ? (
                        <>
                            {microAlgosToString(amount)} <img src={algoImg} alt="" style = {{
                                width: "13px", marginRight: "5px", marginLeft: "2px"
                            }}/>
                        </>
                    ) : (
                        <Spinner animation="border" size="sm" className="opacity-25"/>
                         
                    )}
                    <Identicon address={address} size={28} className="ms-2 me-1"/>
                </Dropdown.Toggle>
                <Typography>
                    <MonetizationOnIcon/> {points_received} AlgoToken Received
                </Typography>
                <Typography>
                   <MonetizationOnIcon/>  {points_given} AlgoToken Given
                </Typography>
                {/* <div variant="light" align="end" id="dropdown-basic" className="d-flex align-items-center border rounded-pill py-1">
                <>
                            {points}
                            <span className="ms-1"> {"TOTAL POINTS"}</span>
                        </>
                </div> */}

                <Dropdown.Menu className="shadow-lg border-0">
                    <Dropdown.Item href={`https://testnet.algoexplorer.io/address/${address}`}
                                   target="_blank">
                        <Stack direction="horizontal" gap={2}>
                            <i className="bi bi-person-circle fs-4"/>
                            <div className="d-flex flex-column">
                                {name && (<span className="font-monospace">{name}</span>)}
                                <span className="font-monospace">{truncateAddress(address)}</span>
                            </div>
                        </Stack>
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button" className="d-flex align-items-center" onClick={() => {
                        disconnect();
                    }}>
                        <i className="bi bi-box-arrow-right me-2 fs-4"/>
                        Disconnect
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
};

Wallet.propTypes = {
    address: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    points_given: PropTypes.number,
    points_received: PropTypes.number,
    symbol: PropTypes.string,
    disconnect: PropTypes.func
};

export default Wallet;