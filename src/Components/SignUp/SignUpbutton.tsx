import styled from "@emotion/styled";

export function SignUpButton() {
    return(
        <All>
            <Body>
                <Text>회원가입</Text>
            </Body>
            <Explanation>
                    <AfterSignUp>이미 회원이신가요?</AfterSignUp>
                    <LogIn>로그인</LogIn>
            </Explanation>
        </All>
    )
}
const All = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:5px;
    `
const Body = styled.div`
    width:350px;
    height: 55px;
    background-color:#FF7EB6;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
`
const Text = styled.div`
    color:#fff;
    font-size: 16px;
`
const Explanation = styled.div`
    display:flex;
    flex-direction:row;
    gap:3px;
`
const AfterSignUp = styled.div`
    color:#949494;
    font-size: 13px;
    
`
const LogIn = styled.div`
    color:#FF7EB6;
    font-size: 13px;
    `