import {useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";


export function useCheckLogin(){
    const navigate = useNavigate();
    const {isLoggedin} = useContext(Authcontext);
    useEffect(function(){
        if(isLoggedin) navigate('/dashboard');
    }, [isLoggedin, navigate])
}
