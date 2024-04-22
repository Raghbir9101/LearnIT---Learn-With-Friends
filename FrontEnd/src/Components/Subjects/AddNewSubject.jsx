
import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Context } from '../Context/Context';
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

const StyledModalContent = styled(Container)({
    marginTop: "50px",
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center"
});

const StyledButton = styled(Button)({
    backgroundColor: '#2ecc71', // Light green
    '&:hover': {
        backgroundColor: '#27ae60', // Darker shade of green on hover
    },
});


const AddNewSubject = ({ openModal, setOpenModal, setSubjects }) => {
    const { loginUserName } = useContext(Context)
    const [newSubjectName, setNewSubjectName] = useState('');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubjectNameChange = (event) => {
        setNewSubjectName(event.target.value);
    };
    const handleCreateSubject = async () => {
        if (!newSubjectName) return alert("Invalid Subject Name")
        const newSubject = {
            name: newSubjectName,
            creator: loginUserName || 'Anonymous', // You can change this to the logged-in user's name
            creationDate: new Date().toISOString().split('T')[0],
        };
        let { data: res } = await HTTP.post(`subjects`, newSubject)
        setSubjects(p => {
            return [...p, res]
        });
        setOpenModal(false);
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <StyledModalContent>
                <Typography variant="h4" gutterBottom>
                    Add New Subject
                </Typography>
                <TextField
                    label="Subject Name"
                    value={newSubjectName}
                    onChange={handleSubjectNameChange}
                    variant="filled"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />
                <StyledButton fullWidth onClick={handleCreateSubject} variant="contained" color="primary">
                    Create
                </StyledButton>
                <Button fullWidth onClick={handleCloseModal} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </StyledModalContent>
        </Modal>
    )
}

export default AddNewSubject