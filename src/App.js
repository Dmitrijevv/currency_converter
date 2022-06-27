import {React, useEffect, useState} from 'react';
import Input from "./Input";
import axios from "axios";
import "./App.css"


function App() {

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');
    const [rates, setRates] = useState([])

    useEffect(() => {
        axios.get(`https://api.apilayer.com/fixer/latest`, {
            headers:{
                "apikey": "LqZ5M5q2paT8JjSiR60rEPYqZ9JkOCx7"
            }
        })
            .then(response => {
                setRates(response.data.rates)
            })
    }, [])

    useEffect(() => {
        if(!!rates){
            handleAmount1Change(1)
        }
    }, [rates])

    let format = (number) => {
        return number.toFixed(2)
    }

    let handleAmount1Change = (amount1) => {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
        setAmount1(amount1);
    }

    let handleCurrency1Change = (currency1) => {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
        setCurrency1(currency1)
    }

    let handleAmount2Change = (amount2) => {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
        setAmount2(amount2);
    }

    let handleCurrency2Change = (currency2) => {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
        setCurrency2(currency2)
    }

return (
    <div>
        <h1>Currency converter</h1>
      <Input
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currensies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}/>
        <Input
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currensies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}/>
    </div>
)

}

export default App;
