import styled from "@emotion/styled";
import { useState } from "react";
import { MiniLogoBox } from "../Components/MiniLogo"
import { FolderCollection } from "../Components/main/FolderCollection"
import { SearchBox } from "../Components/main/SearchBox";
import { Profile } from "../Components/main/Profile";
import { useNavigate } from "react-router-dom";
import type {Folder, Link} from  "../Components/types/link"


export function MainPage () {
    const navigate = useNavigate(); // 클릭시 다른 페이지로 이동

    const [folders, setFolders] = useState<Folder[]>([
        
    ]);
    const [selectedFolder, setSelectedFolder] = useState<number | "all">("all"); // 폴더 목록
    const [links, setLinks] = useState<Link[]>([]); //저장된 링크 목록

    const handleAddFolder = (name: string) => {
        setFolders(prev => [...prev, { id: Date.now(), name }]); //  폴더 추가 함수
    };  // prev => : 이전상태를 인수로 받음(안정적), ...prev : 배열의 요소를 새로 꺼내어 나열하여 새 배열 생성

    const handleAddLink = (link: Omit<Link, "id" | "clickCount" | "createdAt">) => {
        setLinks(prev => [...prev, { ...link, id: Date.now(), clickCount: 0, createdAt: Date.now() }]);
        // TODO: 백엔드 연결 후에는 여기서 POST /links 호출로 대체, 서버가 내려주는 id/createdAt 사용
    };

    const handleClickLink = (id: number) => {
        setLinks(prev => prev.map(link => (link.id === id ? { ...link, clickCount: link.clickCount + 1 } : link)));
        // TODO: 백엔드 연결 후에는 여기서 POST /links/:id/click 호출로 대체 (낙관적 업데이트 유지 가능)
    };

    const handleEditLink = (updated: Link) => {
        setLinks(prev => prev.map(link => (link.id === updated.id ? updated : link)));
    }; // id가 같은 링크만 수정하여 새 정보로 업데이트함.

    const handleDeleteLink = (id: number) => {
        setLinks(prev => prev.filter(link => link.id !== id));
    }; 

    const handleMoveFolder = (id: number, folderId: number | null) => {
        setLinks(prev => prev.map(link => (link.id === id ? { ...link, folderId } : link)));
    };  // 배열의 원소를 하나씩 모아 link라는 이름으로 콜백에 넘김

    const handleTogglePin = (id: number) => {
        setLinks(prev => prev.map(link => (link.id === id ? { ...link, pinned: !link.pinned } : link)));
    }; // 고정/고정해제 토글

    const handleRenameFolder = (id: number, name: string) => {
        setFolders(prev => prev.map(folder => (folder.id === id ? { ...folder, name } : folder)));
    }; // 삼항연산자

    const handleDeleteFolder = (id: number) => {
        setFolders(prev => prev.filter(folder => folder.id !== id)); // id가 같지 않은것 빼고 삭제
        setLinks(prev => prev.map(link => (link.folderId === id ? { ...link, folderId: null } : link)));
        setSelectedFolder(prev => (prev === id ? "all" : prev));
    }; // 폴더 삭제 

    const handleGoProfile=()=>{
        navigate("/MyPage")
    }
    return(
        <Body>
            <MiniLogoBox/>
            <FolderCollection
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={setSelectedFolder}
                onAddFolder={handleAddFolder}
                onRenameFolder={handleRenameFolder}
                onDeleteFolder={handleDeleteFolder}
            />
            <Box>
                <SearchBox
                    links={links}
                    folders={folders}
                    selectedFolder={selectedFolder}
                    onAddLink={handleAddLink}
                    onEditLink={handleEditLink}
                    onDeleteLink={handleDeleteLink}
                    onMoveFolder={handleMoveFolder}
                    onTogglePin={handleTogglePin}
                    onClickLink={handleClickLink}
                />
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