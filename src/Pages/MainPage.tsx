import styled from "@emotion/styled";
import { MiniLogoBox } from "../Components/MiniLogo"
import { FolderCollection } from "../Components/main/FolderCollection"
import { SearchBox } from "../Components/main/SearchBox";


export function MainPage () {
    return(
        <Body>
            <MiniLogoBox/>
            <FolderCollection/>
            <Box>
                <SearchBox/>
            </Box>
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