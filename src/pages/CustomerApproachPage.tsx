// src/pages/CustomerApproachPage.tsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Paper } from '@mui/material';
import ApproachTypeDialog from '../components/ApproachTypeDialog';
import ApproachInfo from './tabs/ApproachInfo';
import SalesInfo from './tabs/SalesInfo';
import HistoryInfo from './tabs/HistoryInfo';
import { CaptureImageWithCoordinates } from '../components/CameraCapture';

const CustomerApproachPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(true);
    const [approachType, setApproachType] = useState<string | undefined>();

    const handleDialogClose = (type?: string, imageDatas?: CaptureImageWithCoordinates[]) => {
        console.log(type, imageDatas);
        setDialogOpen(false);
        setApproachType(type);

    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <ApproachTypeDialog open={dialogOpen} onSelect={handleDialogClose} />
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Thông tin tiếp cận" />
                <Tab label="Thông tin doanh số" />
                <Tab label="Lịch sử tiếp cận" />
            </Tabs>
            {tabIndex === 0 && <ApproachInfo />}
            {tabIndex === 1 && <SalesInfo />}
            {tabIndex === 2 && <HistoryInfo />}
        </Box>
    );
};

export default CustomerApproachPage;
