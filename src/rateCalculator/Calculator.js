import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { useState } from 'react';
import '../App.css'
import './Calculator.css'
import { MenuItem, Tooltip } from '@mui/material';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {IconButton} from '@mui/material';



export default function Calculator(
  { buyUsdRate, sellUsdRate }
) {
  let [rateCalculatorToUSD, setRateCalculatorToUSD] = useState("usd-to-lbp")
  let [enteredAmount, setEnteredAmount] = useState("")
  let [convertedAmount, setConvertedAmount] = useState("")
  function calculate() {
    if (rateCalculatorToUSD === "" || enteredAmount === "") {
      setConvertedAmount("Please Fill All Fields");
    }
    else {
      if (rateCalculatorToUSD === true) {
        setConvertedAmount((enteredAmount / buyUsdRate).toFixed(2).toString() + "$")
      }
      else {
        setConvertedAmount((enteredAmount * sellUsdRate).toFixed(2).toString() + "L.L")
      }
    }
  }
  return (
    <div>
      <Typography variant="h5" style={{ "font-weight": "bold" }} >
      <span>Rate Calculator </span>
      <Tooltip title="the following is a rate calculator: You enter a specific amount, choose what the conversion type, and press calculate to get your result">
        <IconButton >
          <AiOutlineInfoCircle className='icon_button_design'/>
        </IconButton>
      </Tooltip>
      </Typography>
      <div className="form-item">
        <TextField
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          fullWidth
          id='text-field-amount'
          label="Amount"
          type="number"
          value={enteredAmount}
          onChange={({ target: { value } }) => {
            if (value<0 || value>1e12) {
              setEnteredAmount("")
            }
            else{
              setEnteredAmount(value)
            }
        }}
        inputProps={{
            min: 0,
          }}
        />
      </div>

      <Select id="transaction-type" style={{ color: 'white' }} defaultValue={rateCalculatorToUSD} size="small" onChange={e => setRateCalculatorToUSD(e.target.value == "lbp-to-usd")}>
        <MenuItem value="usd-to-lbp">USD to LBP</MenuItem>
        <MenuItem value="lbp-to-usd">LBP to USD</MenuItem>
      </Select>
      <div>
        <Button id="calculate-button"  variant='contained' size='small' style={{ marginTop: "20px", backgroundColor: "white", color: "#2c2c6c", fontWeight: "bold" }} onClick={() => calculate()}>calculate</Button>
      </div>
      <div>
        <Typography variant="h5" style={{ "font-weight": "bold" }} >{convertedAmount}</Typography>
      </div>
    </div>
  )
}