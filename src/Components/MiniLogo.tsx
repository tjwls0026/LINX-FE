import styled from "@emotion/styled";
import MiniLogo from "../assets/minilogo.svg"

export function MiniLogoBox() {
    return (
        <Img src={MiniLogo}></Img>
    )
}
const Img = styled.img`
    width:70px;

    position:absolute;
    top:10px;
    left:10px;
`   