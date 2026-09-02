import styled from "@emotion/styled";
import { MiniLogoBox } from "../Components/MiniLogo"
import { FolderCollection } from "../Components/main/FolderCollection"
import { SearchBox } from "../Components/main/SearchBox";
import { Profile } from "../Components/main/Profile";
import { useNavigate } from "react-router-dom";


export function MainPage () {
    const navigate = useNavigate();
    const handleGoProfile=()=>{
        navigate("/MyPage")
    }
    return(
        <Body>
            <MiniLogoBox/>
            <FolderCollection/>
            <Box>
                <SearchBox/>
            </Box>
            <ProfilBox
            onClick={handleGoProfile}>
                <Profile/>
            </ProfilBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background-color:#FDFDFC;
    overflow:hidden;

    display:flex;
    justify-content:space-between;
    align-items:center;
`
const Box = styled.div`
    width:1150px;
    height:670px;
    
    position:absolute;
    left:22%;
    top:120px;
    
`
const ProfilBox = styled.div`
    position:absolute;
    right:30px;
    top:30px;
`