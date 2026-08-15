import styled from "@emotion/styled";
import { BackgroundBox } from "../Components/BackgroundBox";
import { Logo } from '../Components/Logo'
import { LogInText } from '../Components/Login/LogInText'
import { useState } from "react";
import { LogInButton } from "../Components/Login/LogInButton";

export function LogInPage() {
    const [email,setEmail] = useState("");
    return(
        <Body>
            <Logo/>
            <BackgroundBox>
                <Div>
                    <div>
                        <LogInText
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                <LoginButton>
                    <LogInButton/>
                </LoginButton>
                </Div>
            </BackgroundBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background: linear-gradient(110deg, #ffffff 1%, #f9bed8 100%);

    display:flex;
    align-items:center;
    gap:100px;
`
const Div = styled.div`
    gap:100px;
`
const LoginButton = styled.div`
    margin-top:50px;
`