import styled from "@emotion/styled";
import "../../css/AllMargin.css"
import { useRef, useState } from "react";

import profileEdit from "../../assets/profileedit.svg"

interface LinkAddProps {
    onCancel: () => void;
    onAdd:(link: {url:string; title:string, memo:string|null,img:string|null}) => void;
}
export function LinkPlus({onCancel,onAdd}:LinkAddProps) {
    const [img,setImg] = useState<string | null>(null);
    const [url, setUrl] = useState("");
    const [title,setTitle] = useState("");
    const [memo, setMemo] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const urlRegex = /^https?:\/\/.+/;
    
    const ImgChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 입력한 파일중 첫번째
        if(!file) return;
        setImg(URL.createObjectURL(file)); 
    }
    const handleAdd = () => {
        if (!url.trim() || !title.trim()) {
            alert("URL과 제목은 필수입니다");
            return;
        }
        if (!urlRegex.test(url)) {
        alert("URL 형식을 확인해주세요");
        return;
    }
        onAdd({ url, title, memo: memo || null,img });
        onCancel(); // 추가 끝나면 모달 닫기
    }
    return (
        <Body>
            <LinkBox>
                <p style={{fontSize:"30px",margin:"30px 0 10px 30px"}}>링크 추가</p>
                <PicturesBox>
                    <p style={{fontSize:"20px",marginLeft:"30px",marginBottom:"10px"}}>사진 추가(선택)</p>
                    <Img
                    onClick={()=>inputRef.current?.click()}
                    onMouseOver={()=>setIsHovering(true)}
                    onMouseOut={()=> setIsHovering(false)}
                    >
                        {img ? (
                            <img
                            src={img}
                            alt="LinkImg"
                            style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"20px"}}
                            />

                        ):null}
                        { isHovering && (
                        <Editemotion>
                            <ProfileEditImg src={profileEdit}/>
                        </Editemotion>
                )}
                    </Img>
                    <ProfileInput
                    ref={inputRef}
                    type="file"
                    onChange={ImgChange}></ProfileInput>
                </PicturesBox>
                <UrlBox>
                    <p style={{fontSize:"20px",marginLeft:"30px"}}>URL</p>
                    <UrlInput 
                    type="url"
                    placeholder="URL을 입력하세요"
                    onChange={(e) => setUrl(e.target.value)}>
                        
                    </UrlInput>
                </UrlBox>
                <TitleBox>
                    <p style={{fontSize:"20px",marginLeft:"30px"}}>제목</p>
                    <TitleInput  
                    placeholder="제목을 입력하세요"
                    onChange={(e)=>setTitle(e.target.value)}>
                        
                    </TitleInput>
                </TitleBox>
                <MemoBox>
                    <p style={{fontSize:"20px",marginLeft:"30px"}}>메모(선택)</p>
                    <MemoInput
                    placeholder="메모를 입력하세요"
                    onChange={(e)=>setMemo(e.target.value)}>
                    </MemoInput>
                </MemoBox>
                <ButtonBox>
                    <CancelButton
                    onClick={onCancel}>취소</CancelButton>
                    <PlusButton
                    onClick={handleAdd}>추가</PlusButton>
                </ButtonBox>
            </LinkBox>
        </Body>
    )
}
const Body = styled.div`
    width:100vw;
    height:100vh;
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,0.5);
    z-index:100;
`
const LinkBox = styled.div`
    width:500px;
    height:700px;
    background-color:#fff;
    border-radius:30px;
    display:flex;
    gap:15px;
    flex-direction:column;
`
const PicturesBox = styled.div`
    cursor: pointer;
`
const Img = styled.div`
    width:100px;
    height:100px;
    background-color:gray;
    border-radius:20px;
    margin-left:30px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
`
const UrlBox = styled.div`
    display:flex;
    gap:10px;   
    flex-direction:column;
`
const UrlInput = styled.input`
    width:435px;
    height:40px;
    border:#E6E6E6 solid 2px;
    border-radius:10px;
    margin-left:30px;
    outline:none;
    font-family:inherit;
    font-size:15px;
    padding-left:10px;
    &::placeholder{
        color:#BCBCBC;
    }
`
const TitleBox = styled.div`
    display:flex;
    gap:10px;   
    flex-direction:column;
`
const TitleInput = styled.input`
    width:435px;
    height:40px;
    border:#E6E6E6 solid 2px;
    border-radius:10px;
    margin-left:30px;
    outline:none;
    font-family:inherit;
    font-size:15px;
    padding-left:10px;
    &::placeholder{
        color:#BCBCBC;
    }
`
const MemoBox = styled.div`
    display:flex;
    gap:10px;   
    flex-direction:column;
`
const MemoInput = styled.input`
    width:435px;
    height:40px;
    border:#E6E6E6 solid 2px;
    border-radius:10px;
    margin-left:30px;
    outline:none;
    font-family:inherit;
    font-size:15px;
    padding-left:10px;
    &::placeholder{
        color:#BCBCBC;
    }
`
const ButtonBox = styled.div`
    width:100%;
    height:100px;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:20px;
`
const CancelButton = styled.div`
    width:200px;
    height:50px;
    border:#DADADA solid 2px;
    border-radius:10px;
    color:#555555;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
`
const PlusButton = styled.div`
    width:200px;
    height:50px;
    border:#FF7EB6 solid 2px;
    background-color:#FF7EB6;
    border-radius:10px;
    color:#fff;

    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
`
const ProfileInput = styled.input`
    width:150px;
    height:150px;
    background-color:#000;
    margin-left:40px;
    border-radius:20px;
    display:none;
    
`
const Editemotion = styled.div`
    width:150px;
    height:150px;
    overflow:hidden;
    background: rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfileEditImg = styled.img`
    display:flex;
    position:absolute;
    width:20px;
`