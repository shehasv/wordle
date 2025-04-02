import { useImperativeHandle, useState } from 'react';
import './Keyboard.css';
import Button from '@mui/material/Button';

const topRow = ['Q','W','E','R','T','Y','U','I','O','P','🔙'];
const midRow = ['A','S','D','F','G','H','J','K','L','✅'];
const lowRow = ['Z','X','C','V','B','N','M',];

interface keyboard {
    keyClick:any,
    ref:any
}

const Keyboard = ({keyClick, ref}:keyboard) => {

    const [topKeys,setTopKeys] = useState(topRow.map((key)=> {
        return {
            value: key,
            highlightColor: ''
        }
    }))
    const [midKeys,setMidKeys] = useState(midRow.map((key)=> {
        return {
            value: key,
            highlightColor: ''
        }
    }))
    const [lowKeys,setLowKeys] = useState(lowRow.map((key)=> {
        return {
            value: key,
            highlightColor: ''
        }
    }))

    useImperativeHandle(ref, () => ({
        highlightKey
      }));

    const highlightKey = (word:string,solution:string) => {
        const wordsArray = word.split('');
        const solutionArray = solution.split('');   
        const updatedTopKeys:any = topKeys.map((key)=>{
            return {
                ...key,
                highlightColor: updateKeyColor(solutionArray,wordsArray,key)
            }
        })
        setTopKeys(updatedTopKeys)
        const updatedMidKeys:any = midKeys.map((key)=>{
            return {
                ...key,
                highlightColor: updateKeyColor(solutionArray,wordsArray,key)
            }
        })
        setMidKeys(updatedMidKeys)
        const updatedLowKeys:any = lowKeys.map((key)=>{
            return {
                ...key,
                highlightColor: updateKeyColor(solutionArray,wordsArray,key)
            }
        })
        setLowKeys(updatedLowKeys)
        
    }

    const updateKeyColor = (solutionArray:string[],wordsArray:string[],key:any) => {
        if(key.highlightColor == 'green'){
            return key.highlightColor
        } else{
            if(wordsArray.includes(key.value) && solutionArray.includes(key.value)){
                const keyIndex = solutionArray.findIndex((value) => key.value == value)
                if(solutionArray[keyIndex] == wordsArray[keyIndex]) {
                    return 'green'
                } else {
                    return 'yellow'
                }
            } else {
                if(key.highlightColor == 'yellow'){
                    return 'yellow'
                }
            }
        }
    }

    return <div className='keyboard-main-container d-flex'>
        <div className='row row-1 d-flex'>
            {topKeys.map((key) => <Button variant="outlined" style={{background: key.highlightColor, color: key.highlightColor ? 'black' : ''}} size="small" className='key' key={key.value} onClick={(()=> keyClick(key.value))}>{key.value}</Button>)}
        </div>
        <div className='row row-2 d-flex'>
            {midKeys.map((key) => <Button variant="outlined" style={{background: key.highlightColor, color: key.highlightColor ? 'black' : ''}} size="small" className='key' key={key.value} onClick={(()=> keyClick(key.value))}>{key.value}</Button>)}
        </div>
        <div className='row row-3 d-flex'>
            {lowKeys.map((key) => <Button variant="outlined" style={{background: key.highlightColor, color: key.highlightColor ? 'black' : ''}} size="small"className='key' key={key.value} onClick={(()=> keyClick(key.value))}>{key.value}</Button>)}
        </div>
    </div>
}

export default Keyboard;