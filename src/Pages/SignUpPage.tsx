import styled from "@emotion/styled"
import '../css/AllMargin.css'

import { SignUpLogo } from "../Components/SignUpLogo"

export function SignUpPage() {
    return(
        <Body>
            <SignUpLogo/>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background: linear-gradient(111deg, #FFF 1%, #FFD4E7 100%);
`