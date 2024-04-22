import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import AddNewQuestion from './AddNewQuestion';
import HTTP from '../../../HTTP';

const StyledContainer = styled(Container)({
    fontFamily: 'Poppins, sans-serif',
    padding: '30px',
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
});

const StyledAccordion = styled(Accordion)({

});

const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: '#34495e', // Darker teal
    color: '#fff',
});

const StyledAccordionDetails = styled(AccordionDetails)({
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
    flexDirection: 'column',
    padding: '16px', // Reduced padding
});

const StyledTextField = styled(TextField)({
    marginTop: '10px',
    width: '100%',
});
const StyledButton = styled(Button)({
    backgroundColor: '#2ecc71', // Light green
    '&:hover': {
        backgroundColor: '#27ae60', // Darker shade of green on hover
    },
});
const TopRightButton = styled(Button)({
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#27ae60', // Green
    color: '#fff',
    '&:hover': {
        backgroundColor: '#219653', // Darker green
    },
});


const QuestionPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy questions with answers
    const [questions, setQuestions] = useState([]);



    const handleOnlineUsersClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter questions based on search query
    const filteredQuestions = questions.filter((question) =>
        question.question.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        HTTP.get(`questions`).then(res => setQuestions(res.data))
    }, [])

    return (
        <Box p={"10px"} minHeight={"100vh"} bgcolor={"#2c3e50"}>
            <AddNewQuestion openModal={openModal} setOpenModal={setOpenModal} setQuestions={setQuestions} />
            <StyledContainer >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant="h5" gutterBottom>
                                Search Questions
                            </Typography>
                            <StyledButton sx={{ margin: 0 }} variant="contained" color="primary" onClick={() => setOpenModal(true)} >
                                Add New Subject
                            </StyledButton>
                        </Box>

                        <StyledTextField
                            sx={{ mb: "15px" }}
                            InputProps={{
                                style: { color: '#fff' },
                                startAdornment: (
                                    <IconButton sx={{ color: "white" }} disabled>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            variant="outlined"
                            placeholder="Search..."
                            fullWidth
                            margin="dense"
                        />
                        {filteredQuestions.map((question, index) => (
                            <Question key={question._id} question={question} index={index} />
                        ))}
                    </Grid>
                </Grid>
            </StyledContainer>
        </Box>
    );
};

export default QuestionPage;


function Question({ question, index }) {
    const [comments, setComments] = useState({});
    const ref = useRef(null);
    console.log(ref.current)

    const handleCommentSubmit = (event, questionIndex) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const comment = formData.get('comment');
        setComments((prevComments) => ({
            ...prevComments,
            [questionIndex]: [...(prevComments[questionIndex] || []), comment],
        }));
        event.target.reset();
    };
    function htmlDecode(content) {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }
    // ref.current.innerHTML = question.answer
    return <StyledAccordion key={index} sx={{margin:0, mb: "15px" }}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{question.question}</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
            {/* <Box ref={ref}>{ }</Box> */}
            <div dangerouslySetInnerHTML={{ __html: htmlDecode(question.answer) }}></div>
            <br />
            <Typography variant="subtitle1">Comments:</Typography>
            {comments[index] &&
                comments[index].map((comment, commentIndex) => (
                    <Typography key={commentIndex} variant="body2">
                        {comment}
                    </Typography>
                ))}
            <form onSubmit={(event) => handleCommentSubmit(event, index)}>
                <StyledTextField
                    name="comment"
                    label="Add a comment"
                    variant="filled"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />
                <StyledButton sx={{ mt: "10px" }} type="submit" variant="contained" color="primary">
                    Submit
                </StyledButton>
            </form>
        </StyledAccordionDetails>
    </StyledAccordion>
}