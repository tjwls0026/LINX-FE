import styled from "@emotion/styled";

import { ProfileBox } from '../Components/MyPage/ProfileBox'
import { MiniLogoBox } from "../Components/MiniLogo";

export function MyPage() {
    return (
        <Div>
            <MiniLogoBox/>
            <ProfileBox/>
        </Div>
    )
}
const Div = styled.div`
    width:100%;
    height:100vh;
    background-color:#FDFDFC;
    
    display:flex;
    justify-content:center;
    align-items:center;
`