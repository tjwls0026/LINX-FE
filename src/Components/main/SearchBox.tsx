import styled from "@emotion/styled";
import { useState } from "react";

import plus  from "../../assets/plus.svg"
import "../../css/AllMargin.css"
import { LinkPlus } from "./LinkPlus";

import {LinkBox} from "../main/LinkBox"

interface Link{
    url:string;
    title:string;
    memo:string|null;
    img:string|null;
}
export function SearchBox() {
    const [isClick, setIsClick]=useState(false);
    const [links,setLinks] = useState<Link[]>([]);

    const handleAddLinks = (link:Link) => {
        setLinks(prev =>[...prev,link])
    }
    return(
        <Body>
            <TopBox>
                <Search></Search>
                <Plus
                onClick={()=>setIsClick(true)}>
                    <Img src={plus}/>
                    <p>링크 추가</p>
                </Plus>
                {isClick && (
                    <LinkPlus
                        onCancel={() => setIsClick(false)}
                        onAdd={handleAddLinks}/>
                )}
                </TopBox>
            <LinkList>
                {links.map((link, index) => (
                    <LinkBox
                        key={index}
                        link={link}
                    />
                ))}
            </LinkList>
            
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;

    display:flex;
    flex-direction:column;
    gap:15px;
    overflow:hidden;
`
const Search = styled.input`
    width:680px;
    height:60px;
    border:#DADADA solid 3px;
    border-radius:10px;
    outline:none;
    font-family:inherit;
    font-size:18px;
    padding-left:10px;
`
const Plus = styled.div`
    width:150px;
    height:60px;
    background-color:#FF7EB6;
    border-radius:10px;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    font-size:17px;
    color:#fff;
    cursor:default;
`
const Img = styled.img`
    width:20px;
`
const LinkList = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`
const TopBox = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
`