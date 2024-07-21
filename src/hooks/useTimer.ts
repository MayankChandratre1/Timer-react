import { useEffect, useState } from "react";


export default function useTimer(){
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [start, setStart] = useState(false)
    const [ended, setEnded] = useState(false)


    useEffect(()=>{
        if(!start) return;
        const interval = setInterval(()=>{
                if(sec > 0){
                    setSec(prev => prev - 1)
                }else{
                    if(min > 0){
                        setMin(prev => prev - 1)
                        setSec(59)
                    }else{
                        if(hour > 0){
                            setHour(prev => prev - 1)
                            setMin(59)
                            setSec(59)
                        }else{
                            setStart(false)
                            setEnded(true)
                        }
                    }
                }
        },1000)

        return ()=> clearInterval(interval)
    },[start, hour, min, sec])


    const startTimer = () => {
        if(hour <= 0 && min <= 0 && sec <= 0) return
        setStart(true)
        setEnded(false)
    }
    const stopTimer = () => setStart(false)
    const resetTimer = () => {
        stopTimer()
        setHour(0)
        setMin(0)
        setSec(0)
        setEnded(false)
    }

    const setHours = (time: number) => {
        if(time >= 0){
            if(time < 1000){
                setHour(time)
            }else{
                setHour(0)
            }
        }else{
            setHour(999)
        }
    }
    const setMinutes = (time: number) => {
        if(time >= 0 ){
            if( time < 60 ){
                setMin(time)
            }else{
                setMin(0)
            }
        }else{
            setMin(59)
        }
    }
    const setSeconds = (time: number) => {
        if(time >= 0 ){
            if( time < 60 ){
                setSec(time)
            }else{
                setSec(0)
            }
        }else{
            setSec(59)
        }
    }

    const Timer = {
        time:{
            hour, min, sec
        },
        setHours,
        setMinutes,
        setSeconds,
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
        isEnded: ended
    }

    return Timer
}