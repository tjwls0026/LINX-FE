import styled from "@emotion/styled";
import { useState } from "react";
import "../../css/AllMargin.css"

import pinkIcon from "../../assets/ppinkhouseIcon.svg"
import houseIcon from "../../assets/houseIcon.svg"
import plusIcon from "../../assets/PlusIcon.svg"
import folderIcon from "../../assets/folder.svg"
import pinkfolder from "../../assets/pinkfolder.svg"

interface Link {
    id:number;
    title:string;
    url:string;
}
interface Folder {
    id: number;
    name:string;
    links:Link[];
}
interface BoxProps{
    selected:boolean;
}

export function FolderCollection(){
    const [selectedFolder, setSelectedFolder] = useState<number | "all">("all");
    const [folders, setFolders] = useState<Folder[]>([
        { id: 1, name: "개발", links:[],},
        { id: 2, name: "디자인", links:[], },
        
    ]);
    const [links, setLinks] = useState<Link[]>([
        { id:1, title:"피그마", url :"http://localhost:5173/MainPage"}
    ])
    return (
        <Body>
            <AllBox
            selected={selectedFolder === "all"}
            onClick={()=>setSelectedFolder("all")}
            style={{backgroundColor:selectedFolder === "all" ? "#FFC4DE":""}}>
                <Img src={selectedFolder==="all" ? pinkIcon : houseIcon}/>
                <p style={{fontSize:"18px",color:selectedFolder ==="all" ? "#FF7EB6":"#636363"}}>전체</p>
            </AllBox>
            {folders.map((folder) => (
                <FolderBox
                    key={folder.id}
                    selected={selectedFolder === folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                >
                    <Img src={selectedFolder === folder.id ? pinkfolder : folderIcon}/>
                    <p style={{color:selectedFolder===folder.id ? "#FF7EB6" : "#636363"}}>{folder.name}</p>
                </FolderBox>
            ))}
            <FolderPlusBox>
                <Img src={plusIcon}/>
                <p style={{color:"#636363",fontSize:"18px"}}>폴더 추가하기</p>
            </FolderPlusBox>
        </Body>
    )
}
const Body = styled.div`
    width:300px;
    height:550px;
    background-color:#FDFDFC;
    border-right:#dadada solid 3px;

    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;
`
const AllBox = styled.div<BoxProps>`
    width:85%;
    height:65px;
    background-color:#fdfdfd;
    border-radius:15px;

    display:flex;
    align-items:center;
    gap:10px;    
`
const Img = styled.img`
    width:40px;
    margin-left:30px;
`
const FolderPlusBox = styled.div`
    width:85%;
    height:80px;
    background-color:#fdfdfd;
    border-radius:15px;

    display:flex;
    align-items:center;
    gap:10px;    
    cursor: pointer;
`
const FolderBox = styled.div<BoxProps>`
    width: 85%;
    height: 65px;
    font-size:18px;
    background-color: ${({ selected }) =>
    selected ? "#FFC4DE" : "#FDFDFC"};
    border-radius: 15px;


    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`