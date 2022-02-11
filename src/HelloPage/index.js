import {useState} from "react";
import {Box, Paper} from "@mui/material";
import {Header} from "./Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import {tasksList} from "../constants";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        key: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const HelloPage = () => {
    const [task, setTask] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTask(newValue);
    };

    return <Box sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'gray'
    }}>
        <Header />
        <Paper elevation={3} sx={{
            width: 'full',
            backgroundColor: 'white',
            flex: 1,
            m: 2,
            mx: 5,
            p: 2,
            overflow: 'scroll'
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={task} onChange={handleTabChange}>
                        {tasksList.map((item, index) =>
                            <Tab label={item.name} {...a11yProps(index)} />
                        )}
                    </Tabs>
                </Box>
                <Box
                    key={`${tasksList[task].name}-${tasksList[task].index}`}
                    sx={{ flex: 1, }}
                >
                    {tasksList[task].component()}
                </Box>
            </Box>
        </Paper>
    </Box>
}