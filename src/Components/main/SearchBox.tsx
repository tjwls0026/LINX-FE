import styled from "@emotion/styled";
import { useState } from "react";

import plus from "../../assets/plus.svg"
import "../../css/AllMargin.css"
import { LinkPlus } from "./LinkPlus";
import { LinkBox } from "../main/LinkBox"
import { SortDropdown } from "./DropBox";
import type { Link, Folder, SortOption } from "../types/link";

interface SearchBoxProps {
    links: Link[];
    folders: Folder[];
    selectedFolder: number | "all";
    onAddLink: (link: Omit<Link, "id" | "clickCount" | "createdAt">) => void;
    onEditLink: (link: Link) => void;
    onDeleteLink: (id: number) => void;
    onMoveFolder: (id: number, folderId: number | null) => void;
    onTogglePin: (id: number) => void;
    onClickLink: (id: number) => void;
}

export function SearchBox({
    links,
    folders,
    selectedFolder,
    onAddLink,
    onEditLink,
    onDeleteLink,
    onTogglePin,
    onClickLink,
}: SearchBoxProps) {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState("");
    const [editLink, setEditLink] = useState<Link | null>(null);
    const [sortOption, setSortOption] = useState<SortOption>("latest");

    const handleAdd = (link: { url: string; title: string; memo: string | null; img: string | null; folderId: number | null }) => {
        if (editLink) {
            onEditLink({ ...editLink, ...link });
        } else {
            onAddLink({ ...link, pinned: false });
        }
        setEditLink(null);
    }

    const handleClose = () => {
        setIsClick(false);
        setEditLink(null);
    }

    const folderFilter = links.filter((link) =>
        selectedFolder === "all" || link.folderId === selectedFolder
    );

    const sortCompare = (a: Link, b: Link) => {
        switch (sortOption) {
            case "oldest":
                return a.createdAt - b.createdAt;
            case "mostClicked":
                return b.clickCount - a.clickCount;
            case "leastClicked":
                return a.clickCount - b.clickCount;
            case "latest":
            default:
                return b.createdAt - a.createdAt;
        }
    };

    const linkFilter = folderFilter
        .filter((link) =>
            link.title.includes(search) ||
            link.url.includes(search)
        )
        .sort(sortCompare)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)); // 고정된 링크가 맨 앞으로 (정렬 기준보다 우선)

    return (
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
                        onCancel={handleClose}
                        onAdd={handleAdd}
                        editLink={editLink ?? undefined}
                        folders={folders}
                    />
                )}
                </TopBox>
            <SortDropdown value={sortOption} onChange={setSortOption} />
            <LinkList>
                {linkFilter.map((link) => (
                    <LinkBox
                        key={link.id}
                        link={link}
                        onDelete={()=>onDeleteLink(link.id)}
                        onEdit={()=>{
                            setEditLink(link);
                            setIsClick(true);
                        }}
                        onTogglePin={()=>onTogglePin(link.id)}
                        onClickLink={()=>onClickLink(link.id)}
                    />
                ))}
            </LinkList>
            
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100%;

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
    align-content: flex-start;

    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-bottom: 10px;
`
const TopBox = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
`