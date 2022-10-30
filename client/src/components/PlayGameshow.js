import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useState } from 'react'
import "../App.css"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function PlayGameshow() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const { store } = useContext(GlobalStoreContext)
    const [game, setGame] = useState(store.currentGame);
    const [questions, setQuestions] = useState(game['questions']);
    const [defaultPointVal, setDefaultPointVal] = useState(200);
    const [qOpen, setQOpen] = useState(false);
    const [text, setText] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState([])
    const [onAnswer, setOnAnswer] = useState(false);
    const [image, setImage] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [questionImage, setQuestionImage] = useState("");
    const [answered, setAnswered] = useState([[],[false,false,false,false,false,false,false],[
      false,false,false,false,false,false,false],[false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false],[false,false,false,false,false,false,false],[false,false,false,false,false,false,false]])

    let catItems = [];
 
    function handleClick(list, item) {
      console.log(questions[list][item])
        let temp = answered;
        temp[list][item] = true;
        setAnswered(temp)

        setText(questions[list][item]['question'])
        setVideoLink(questions[list][item]['videoLink'])
        setQuestionImage(questions[list][item]['questionImageLink'])
        setCurrentQuestion([list, item])
        setQOpen(true);
    }

    function handleAnswer(list, item) {
        setText(questions[currentQuestion[0]][currentQuestion[1]]['answer'])
        setImage(questions[currentQuestion[0]][currentQuestion[1]]['imgsrc'])
        setOnAnswer(true);
    }

    function handleClose() {
      setImage("")
      setQOpen(false);
      setOnAnswer(false);
    }
    
    for(let i=1; i<6+1; i++){
        let innerArr = [];
        for(let j=1; j<6; j++) {                                                
            let bg = answered[i][j] ? "red" : "blue"

            //Individual list items
            innerArr[j] = 
            <Box key={"list-" + i + "-item-" + j}
            className="question-boxes"
            textAlign="center"
            backgroundColor = {bg}
            onClick = {() => handleClick(i,j)}
            border="3px solid gray">                 

                {defaultPointVal*j + ""}
            </Box>;
        }
        catItems[i] = innerArr;
    }

    let catLists = [];

    for(let i=1; i<6+1; i++) {
        //Lists
        catLists[i] = 
        <Box key = {"list-" + i} className="categories" >

          <Box className="category-box-game">
            <h3 className='catText'>{questions[0][i]}</h3>
          </Box>

          <Box className="question-box">
              {catItems[i]}
          </Box>
        </Box>
    }

    let button = onAnswer ? 
    <Button onClick={handleClose}>Close</Button> : 
    <Button onClick={handleAnswer}>Answer</Button>

    let video = !onAnswer ?
    videoLink == "" ?  <Box></Box>
              : 
              <Box className = "wrapper">
                <Box className="frame-container">
                    <iframe
                    src={videoLink}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                    title='video'
                    />
                </Box>
              </Box>
              : <Box></Box>

    let img = onAnswer ? 
              image == "" ?  <Box></Box>
              : <img className='image' src={image}></img>
              : <Box></Box>

    let qImg = !onAnswer ? 
      questionImage == "" ?  <Box></Box>
      : <img className='image' src={questionImage}></img>
      : <Box></Box>

    let modal = qOpen ? 
    <Box>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography fontSize="20px">
            {qImg}
            {img}
            {video}
            <Box className="qmodal-text">{text}</Box>
          </Typography>
          {button}

        </Box>
      </Modal>
    </Box> 
    : <Box></Box>


    return (
      <Box className="play">
        {modal}

        <Box className="horizontal-list">
            {catLists}
        </Box>

      </Box>
    );
  }
  
  export default PlayGameshow;