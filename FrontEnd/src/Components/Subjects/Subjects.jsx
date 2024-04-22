import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AddNewSubject from './AddNewSubject';
import { Box, Button } from '@mui/material';
import axios from "axios"
import HTTP from '../../../HTTP';
const StyledContainer = styled(Container)({
    fontFamily: 'Poppins, sans-serif',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
});

const OnlineDot = styled('span')({
    width: '10px',
    height: '10px',
    backgroundColor: '#2ecc71',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: '5px',
});

const SubjectCard = styled(Card)({
    marginBottom: '20px',
    backgroundColor: '#34495e',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    },
    '&:focus': {
        outline: 'none',
    },
});
const StyledButton = styled(Button)({
    backgroundColor: '#2ecc71', // Light green
    '&:hover': {
        backgroundColor: '#27ae60', // Darker shade of green on hover
    },
});

const SubjectList = () => {
    const nav = useNavigate()
    const [openModal, setOpenModal] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        HTTP.get(`subjects`).then(res => setSubjects(res.data))
    }, [])

    return (
        <Container maxWidth="md">
            <AddNewSubject openModal={openModal} setOpenModal={setOpenModal} setSubjects={setSubjects} />
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <StyledContainer>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={"20px"}>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px', letterSpacing: '1px', margin: 0, padding: 0 }}>Subjects</h2>
                            <StyledButton sx={{ margin: 0 }} variant="contained" color="primary" onClick={() => setOpenModal(true)} >
                                Add New Subject
                            </StyledButton>
                        </Box>
                        {subjects.map((subject) => (
                            <SubjectCard
                                key={subject._id}
                                onFocus={(e) => e.stopPropagation()}
                                onBlur={(e) => e.stopPropagation()}
                                onClick={() => nav("/subject/" + subject._id)}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {subject.name}
                                    </Typography>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <PersonIcon style={{ marginRight: '5px' }} />
                                        <Typography variant="body2" color="inherit" component="p">
                                            Created by: {subject.creator}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <DateRangeIcon style={{ marginRight: '5px' }} />
                                        <Typography variant="body2" color="inherit" component="p">
                                            Created on: {subject.creationDate}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {subject.onlineLearners > 0 && (
                                            <>
                                                <OnlineDot />
                                                <Typography ml={"5px"} variant="body2" color="inherit" component="p">
                                                    {subject.onlineLearners} online
                                                </Typography>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </SubjectCard>
                        ))}
                    </StyledContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SubjectList;
