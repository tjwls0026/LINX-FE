import styled from "@emotion/styled";
import { useRef, useState } from "react";

import pofile from '../../assets/profile.svg'
import profileEdit from '../../assets/profileedit.svg'
import { useLocation, useNavigate } from "react-router-dom";
import type { SignUpState } from "../types/SignUp";
import { LogOutBox } from "./LogOutBox";

export function ProfileBox(){
    const [img,setImg] = useState<string | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLogin, setIsLogin] = useState(false);

    const [isTouch,setIsTouch] = useState(false);

    const location =useLocation();
    const navigate = useNavigate();
    const {email} = (location.state as SignUpState) ??  {email:""};

    const handleLogout = () => {
        // TODO: 실제 로그아웃 처리(토큰 삭제 등) 연결
        setIsLogin(false);
        navigate("/LogIn");
    }
    const ImgChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 입력한 파일중 첫번째
        if(!file) return;
        setImg(URL.createObjectURL(file)); 
    }

    return(
        <Body>
            <Profile 
            onClick={()=>inputRef.current?.click()}
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=> setIsHovering(false)}>
                {img ? (
                    <img
                    src={img}
                    alt="profile"
                    style={{width:"100%", height:"100%",objectFit:"cover", borderRadius:"50%"}}/>
                ) : ( 
                    <img style={{width:"70%"}}src={pofile}/> //가짜 프로필 input
                )}
                { isHovering && (
                    <Editemotion>
                        <ProfileEditImg src={profileEdit}/>
                    </Editemotion>
                )}
            </Profile> 
            <ProfileInput
            ref={inputRef}
            type="file" // 진짜 프로필 input
            onChange={ImgChange}></ProfileInput> 
            <NameEmailBox>
                <Email>{email}
                </Email>
            </NameEmailBox>
            <LogoutTextBox
            onClick={()=>setIsLogin(true)}
            onMouseOver={()=>setIsTouch(true)}
            onMouseOut={()=> setIsTouch(false)}
            style={{backgroundColor: isTouch ? '#FF4848':'#fff'
                , border: isTouch ? '#fff 2px solid':'#FF4848 solid 2px',
                color: isTouch ? '#fff' : '#FF4848'
            }}>
                <p style={{fontSize:"15px"}}>로그아웃</p>
            </LogoutTextBox>
            {isLogin && (
                <LogOutBox
                email={email}
                onCancel={()=>setIsLogin(false)}
                onConfirm={handleLogout}/>
            )}
        </Body>
    )
}
const Body = styled.div`
    width:1000px;
    height:220px;
    background-color: #fff;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.03);
    border-radius:20px;

    display:flex;
    justify-content:space-between;
    align-items:center;
    
`
const ProfileInput = styled.input`
    width:150px;
    height:150px;
    background-color:#000;
    margin-left:40px;
    border-radius:50%;
    display:none;
`
const Profile = styled.div`
    width:150px;
    height:150px;
    margin-left:40px;
    border:solid 2px #f3f3f3;  
    border-radius:50%;

    display:flex;
    background-color:#eeeeee;
    justify-content:center;
    align-items:center;

    position:relative;
`
const Editemotion = styled.div`
    width:150px;
    height:150px;
    overflow:hidden;
    background: rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfileEditImg = styled.img`
    display:flex;
    position:absolute;
    width:20px;
`
const NameEmailBox = styled.div`
    
`
const Email = styled.div`
    
`
const LogoutTextBox = styled.div`
    width:100px;
    height:30px;
    
    
    border-radius:50px;
    margin-right:40px;
    
    display:flex;
    justify-content:center;
    align-items:center; 

`