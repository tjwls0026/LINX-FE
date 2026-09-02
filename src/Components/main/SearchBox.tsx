import styled from "@emotion/styled";
import { useState } from "react";

import plus  from "../../assets/plus.svg"
import "../../css/AllMargin.css"
import { LinkPlus } from "./LinkPlus";

import {LinkBox} from "../main/LinkBox"

interface Link{
    id:number;
    url:string;
    title:string;
    memo:string|null;
    img:string|null;
}
export function SearchBox() {
    const [isClick, setIsClick]=useState(false);
    const [links,setLinks] = useState<Link[]>([]);
    const [search, setSearch] = useState("");
    
    const handleAddLinks = (link:Link) => {
        setLinks(prev =>[...prev,{
            ...link,
            id: Date.now() // 현재 시간을 링크의 id로 설정

        }])
    }
    const handleDelet =(id:number)=>{
        setLinks(prev=>prev.filter(link=>link.id!==id));
    }
    const linkFilter = links.filter((link)=>
        link.title.includes(search) ||
        link.url.includes(search)
    );
    return(
        <Body>
            <TopBox>
                <Search
                value={search}
                onChange={(e)=> setSearch(e.target.value)}></Search>
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
                {linkFilter.map((link) => (
                    <LinkBox
                        key={link.id}
                        link={link}
                        onDelete={()=>handleDelet(link.id)}                     
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
    cursor:pointer;
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