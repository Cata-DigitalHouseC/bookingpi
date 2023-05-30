import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import {DateRangePicker} from 'react-date-range'
import { Button, InputBase, Typography, makeStyles } from '@material-ui/core';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {selectStart, setStart} from "../features/startSlice"
import {selectEnd, setEnd} from "../features/endSlice"


const DatePicker = () => {
  const classes = useStyle();
  const history = useNavigate();
  const start = useSelector(selectStart);
  const end =  useSelector(selectEnd);
  const dispatch = useDispatch();

  const selectionRange = {
    startDate: start,
    endDate: end,
    key:"selection"
}

  const handleSelect = (ranges) => {
    dispatch(setStart(ranges.selection.startDate.getTime()))
    dispatch(setEnd(ranges.selection.endDate.getTime()))
  }  
  return (
    <div className = {classes.root}>
        <DateRangePicker ranges={[selectionRange]}
            onChange={handleSelect}
        />
        <div className = {classes.inputSection}>
            <Typography variant="h5">Number of guests</Typography>
            <div className = {classes.people}>
                <InputBase placeholder = "2"
                    inputProps={{className: classes.input}}
                />
                <PeopleAltIcon/>
            </div>
            <Button onClick={()=> history("/search")}>Search Space to work!</Button>
        </div>
    </div>
  )
}

const useStyle=makeStyles((theme)=>({
    root: {
        position:"absolute",
        top:"17vh",
        left:"30vh",
        zIndex: "50",
        [theme.breakpoints.down("sm")]:{
            top:"16vh",
            left:0
        },
    },
    inputSection:{
        display:"flex",
        flexDirection:"column",
        backgroundColor:"#fff",
        "& h5":{
            textAlign:"center"
        },
        "& button:hover":{
            backgroundColor:"rgba(255,103,31,0.4)",
            color:"#fff"
        }
    },
    people:{
        display:"flex",
        justifyContent: "center",
        alignItems:"center",

    },
    input:{
        width:"3vw",
        border:"1px solid #ccc",
        margin: theme.spacing(1,1,1,3),
        padding: theme.spacing(1,0,1,3),
        justifyContent:"center"
    }
}))

export default DatePicker