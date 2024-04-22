import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Context } from '../Context/Context';
import HTTP from '../../../HTTP';

const StyledModalContent = styled(Container)({
    marginTop: '50px',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'
});

function convertToHTML(input) {
    // Replace newline characters with <br> tags
    let htmlString = input.replace(/\n/g, "<br>");

    // Replace words wrapped in ** with <strong> tags
    htmlString = htmlString.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace spaces at the beginning of a line with &nbsp; to preserve indentation
    htmlString = htmlString.replace(/^ /gm, "&nbsp;");

    // Escape HTML entities
    htmlString = htmlString.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return htmlString;
}



const AddNewQuestion = ({ openModal, setOpenModal, setQuestions }) => {
    const { subjectID } = useParams()
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const { loginUserName } = useContext(Context)
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleQuestionChange = (event) => {
        setNewQuestion(event.target.value);
    };

    const handleAnswerChange = (event) => {
        setNewAnswer(event.target.value);
    };

    const handleCreateQuestion = async () => {
        if (!newQuestion || !newAnswer) return alert("Invalid Question or Answer !")
        let temp = {
            question: newQuestion,
            answer: convertToHTML(newAnswer),
            subjectID,
            createdBy: loginUserName
        }
        let { data: res } = await HTTP.post(`questions`, temp)
        setQuestions(p => {
            return [...p, res]
        })
        setNewQuestion("")
        setNewAnswer("")
        handleCloseModal();
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <StyledModalContent>
                <Typography variant="h4" gutterBottom>
                    Add New Question
                </Typography>
                <TextField
                    label="Question"
                    value={newQuestion}
                    onChange={handleQuestionChange}
                    variant="filled"
                    fullWidth
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />
                <TextField
                    label="Answer"
                    value={newAnswer}
                    onChange={handleAnswerChange}
                    variant="filled"
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />
                <Box>
                    <Button fullWidth onClick={handleCreateQuestion} variant="contained" color="primary">
                        Create
                    </Button>
                    <Button fullWidth onClick={handleCloseModal} variant="outlined" color="secondary" style={{ marginTop: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </StyledModalContent>
        </Modal>
    );
};

export default AddNewQuestion;
