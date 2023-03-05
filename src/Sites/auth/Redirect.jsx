import * as React from 'react';

import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Login({GlobalState}) {
    const redirectUrl = 'http://localhost:5173/auth/redirect';
    const {pb, setPb,user,setUser} = GlobalState
    let navigate = useNavigate();

    useEffect(() => {
        if (pb.authStore.isValid){
            return navigate("/tournaments/events");
        }
    }, []);


    const provider = JSON.parse(localStorage.getItem('provider'))
    let query = useQuery();

    if (provider.state !== query.get('state')) {
        throw "State parameters don't match.";
    }


    pb.collection('users').authWithOAuth2(
        provider.name,
        query.get('code'),
        provider.codeVerifier,
        redirectUrl,
        {
            emailVisibility:false,
        }
        ).then((authData)=>{
            pb.collection('users').update(authData.record.id,{
                "avatarUrl":authData.meta.avatarUrl,
                "fullname":authData.meta.name,
                "dcID":authData.meta.id,
                "name":authData.meta.username,
            })
            setUser(authData)
            window.localStorage.setItem('user', JSON.stringify(authData));
            navigate("/")
        }).catch((err)=>{
            console.log(err)
        navigate("/auth/login")
        }
    )

    return (
        <>
        IF YOU CAN READ THIS TEXT SOMETHING WENT WRONG!!<br/>
            STOP MESSING WITH MY SHIT --_____--
        </>

    );
}