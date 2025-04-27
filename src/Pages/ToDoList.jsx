import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import Navigation from '../Components/Navigation'
import AddingModal from '../Components/AddingModal'

export const ToDoList = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: '25px' }}>
            <Box display='flex' justifyContent='center' alignItems='center' >
                <Paper elevation={5} sx={{ width: '100%', p: 4, }}>
                    <Typography variant='h3' gutterBottom sx={{ textAlign: 'center' }}>
                        My Tasks
                    </Typography>

                    <Box component='div' sx={{
                        maxHeight: '485px',
                        overflowY: 'auto',
                        pr:'10px',
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'primary.main',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}>
                        <Navigation />
                    </Box>

                    <Box>
                        <AddingModal />
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
