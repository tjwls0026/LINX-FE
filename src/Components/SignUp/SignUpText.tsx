import styled from "@emotion/styled";

import { TextBox } from "../TextBox";
import { SignUpButton } from "./SignUpbutton";

import name from "../../assets/name.svg"
import { PassWordInput } from "./PassWordInput";

export function SignUpText() {
    return(
        <Body>
            <div>
                <SignUptext>회원가입</SignUptext>
                <SignUpExplanation>회원가입 하고 모든 기능을 사용해보세요.</SignUpExplanation>
            </div>
            <Div>
                <TextBoxAll>
                <Box>
                    <Title>닉네임</Title>
                    <TextBox>
                        <Logo src={name}/>
                        <Input placeholder="닉네임을 입력하세요."/>
                    </TextBox>
                </Box>
                
            </TextBoxAll>
            <PassWordInput/>
            </Div>
            <SignUpButton/>
        </Body>
    )
}
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    `
const Div = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 25px;
    `
const SignUptext = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: center;
    text-align: center;

`
const SignUpExplanation = styled.div`
    display: flex;
    color: #989898;
    font-size: 16px;
    text-align: center;
    justify-content:center;
    margin-top:10px;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap:5px;
`
const Title = styled.div`
    color:#000;
    font-size: 16px;
`
const Logo = styled.img`
    width: 50px;
`

const Input = styled.input`
    font-size: 16px;
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    background:none;
    &::placeholder {
        color: #bcbcbc;
        font-size: 16px;
    }
`
const TextBoxAll = styled.div`
    display: flex;
    flex-direction:column;
    gap: 25px;
`