import {Avatar, Box, Paper} from "@mui/material";

export const Header = () => {
    return <Paper elevation={3}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'full',
            height: 60,
            backgroundColor: 'black',
        }}>
            <Box sx={{ mx: 5 }}>
                <Avatar variant="rounded" src="logo.jpg"/>
            </Box>
            <Box sx={{ mx: 5,  flex: 1, display: 'flex', flexFlow: 'row-reverse', color: 'white' }}>
                Hello, Vestiaire Collective!
            </Box>
        </Box>
    </Paper>

}