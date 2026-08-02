import styled from "@emotion/styled";

export function SignUpText() {
    return(
        <body>
            <SignUptext>회원가입</SignUptext>
            <SignUpExplanation>회원가입 하고 모든 기능을 사용해보세요.</SignUpExplanation>
        </body>
    )
}
const SignUptext = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

`
const SignUpExplanation = styled.div`
    color: #989898;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`