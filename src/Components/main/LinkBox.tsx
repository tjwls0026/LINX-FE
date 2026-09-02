import styled from "@emotion/styled";
import hambugerIcon from "../../assets/hamberger.svg"
import bocsaIcon from "../../assets/boksaIcon2.svg"
import goIcon from "../../assets/goIcon2.svg"
import { LinkSetting } from "./LinkSetting";
import { useState } from "react";

interface Link{
    url:string;
    title:string;
    memo:string|null;
    img
}
interface LinkBoxProps{
    link:Link;
    onDelete : ()=>void
}
export function LinkBox({link,onDelete}:LinkBoxProps) {
    const [isSetting,setIsSetting] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(link.url);
        alert("링크가 복사되었습니다")
    }
    const Link = () => {
        window.open(link.url,"_blank");
        setIsSetting(false);
    }
    return(
        <Body
        onClick={()=>setIsSetting(false)}>
            
            <Box onClick={Link}>
                
                {link.img && (
                <LinkImage src={link.img} alt="링크 이미지" />
                )}
                <Img></Img>
                <TitleBox>
                    <Title>{link.title}</Title>
                    <Memo>{link.memo}</Memo>
                </TitleBox>
            </Box>
            <HambugerIcon
                onClick={(e) => {
                e.stopPropagation();
                setIsSetting(true);
            }}>
                <img src={hambugerIcon}
                style={{width:"5px"}}></img>
            </HambugerIcon>
            { isSetting &&(
                <LinkSetting
                onDelete={onDelete}/>
            ) }
            <BocsaIcon
            onClick={copy}>
                <img src={bocsaIcon}
                style={{width:"25px"}}/>
                </BocsaIcon>    
            <GoIcon
            onClick={()=>window.open(link.url,"_blank")}>
                <img src={goIcon}
                style={{width:"25px"}}/>
            </GoIcon>
        </Body>
    )
}
const Body = styled.div`
    width:350px;
    height:250px;
    background-color:#fff;
    border:solid 3px #DADADA;
    border-radius:20px;

    display:flex;
    align-items:center;
    position:relative;
`
const Title = styled.div`
    color:#000;
    font-size:20px;
`
const Memo = styled.div`
    color:#636363;
    font-size:16px;
`
const Img = styled.div`
    
`
const Box = styled.div`
    width:100%;
    height:100%;
    display:flex;
    
    margin-left:20px;
    margin-top:40px;
    flex-direction:column;
    gap:5px;
`
const LinkImage = styled.img`
    width: 80px;;
    height: 80px;
    object-fit: cover;
    border-radius: 20px;
`
const TitleBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
`
const HambugerIcon = styled.div`
    position:absolute;
    right:10px;
    top:10px;
    width:30px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
`
const BocsaIcon = styled.div`
    position:absolute;
    right:50px;
    bottom:10px;
    cursor: pointer;
`
const GoIcon = styled.div`
    position:absolute;
    right:20px;
    bottom:10px;
    cursor: pointer;
`