import styled from "@emotion/styled";
import { useState } from "react";
import type { Folder, Link } from "../types/link";
import foldericon from "../../assets/foldericon.svg"
import linkicon from "../../assets/linkicon.svg"

interface UserProfile {
    name?: string;
    email?: string;
    joinedAt?: number;
}

function formatDate(timestamp: number) {
    const d = new Date(timestamp);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
}

export function StatsSummary() {
    // MainPage에서 저장해둔 폴더/링크, 회원가입 때 저장해둔 프로필을 불러온다
    const [folders] = useState<Folder[]>(() => {
        const stored = localStorage.getItem("folders");
        return stored ? (JSON.parse(stored) as Folder[]) : [];
    });
    const [links] = useState<Link[]>(() => {
        const stored = localStorage.getItem("links");
        return stored ? (JSON.parse(stored) as Link[]) : [];
    });
    const [profile] = useState<UserProfile | null>(() => {
        const stored = localStorage.getItem("userProfile");
        return stored ? (JSON.parse(stored) as UserProfile) : null;
    });

    const folderCount = folders.length;
    const linkCount = links.length;

    const mostClickedLink = links.reduce<Link | null>((max, link) => {
        if (!max || link.clickCount > max.clickCount) return link; // max가 아직 없으면(null) 무조건 첫 링크를 넣고, 있으면 클릭수 더 많은 쪽으로 교체함
        return max;
    }, null); // reduce로 최댓값 찾는 패턴이라 처음엔 어떻게 동작하는지 좀 어려웠던 부분

    const now = new Date();
    const thisMonthLinkCount = links.filter((link) => {
        const created = new Date(link.createdAt);
        return (
            created.getFullYear() === now.getFullYear() &&
            created.getMonth() === now.getMonth()
        ); // 연도랑 월이 둘다 같아야 이번달로 침. 월만 비교하면 작년 같은 달 데이터까지 걸려버려서 연도 체크를 꼭 같이 해줘야함 (여기 실수할뻔했던 부분)
    }).length;

    const joinedText = profile?.joinedAt ? formatDate(profile.joinedAt) : "-";

    return (
        <Wrap>
            <CountRow>
                <CountCard>
                    <IconBox>
                        <img src={foldericon}/>
                    </IconBox>
                    <CountText>
                        <Count>{folderCount}개</Count>
                        <Label>총 생성한 파일</Label>
                    </CountText>
                </CountCard>
                <CountCard>
                    <IconBox>
                        <img src={linkicon}/>
                    </IconBox>
                    <CountText>
                        <Count>{linkCount}개</Count>
                        <Label>총 생성한 링크</Label>
                    </CountText>
                </CountCard>
            </CountRow>

            <SummaryCard>
                <SummaryTitle>활동 요약</SummaryTitle>
                <SummaryRow>
                    <SummaryLabel>가장 많이 클릭한 링크</SummaryLabel>
                    {mostClickedLink ? (
                        <SummaryValue>
                            {mostClickedLink.title}
                            <Badge>{mostClickedLink.clickCount}회</Badge>
                        </SummaryValue>
                    ) : (
                        <SummaryValue>아직 없어요</SummaryValue>
                    )}
                </SummaryRow>
                <SummaryRow>
                    <SummaryLabel>이번 달 추가한 링크</SummaryLabel>
                    <SummaryValue>{thisMonthLinkCount}개</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                    <SummaryLabel>가입 일자</SummaryLabel>
                    <SummaryValue>{joinedText}</SummaryValue>
                </SummaryRow>
            </SummaryCard>
        </Wrap>
    );
}
const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    width:96%;
    max-width:1500px;
    min-width:560px;
`
const CountRow = styled.div`
    display:flex;
    gap:20px;
`
const CountCard = styled.div`
    flex:1;
    background-color:#fff;
    border:1.5px solid #EFEFEF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius:20px;
    padding:30px;

    display:flex;
    align-items:center;
    gap:20px;
`
const IconBox = styled.div`
    width:56px;
    height:56px;
    border-radius:16px;

    display:flex;
    justify-content:center;
    align-items:center;
    flex-shrink:0;
`
const CountText = styled.div`
    display:flex;
    flex-direction:column;
    gap:4px;
`
const Count = styled.div`
    font-size:22px;
    font-weight:700;
    color:#222;
`
const Label = styled.div`
    font-size:14px;
    color:#989898;
`
const SummaryCard = styled.div`
    background-color:#fff;
    border:1.5px solid #EFEFEF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius:20px;
    padding:30px;

    display:flex;
    flex-direction:column;
    gap:18px;
`
const SummaryTitle = styled.div`
    font-size:16px;
    font-weight:700;
    color:#222;
`
const SummaryRow = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const SummaryLabel = styled.div`
    font-size:14px;
    color:#989898;
`
const SummaryValue = styled.div`
    font-size:14px;
    font-weight:700;
    color:#222;

    display:flex;
    align-items:center;
    gap:8px;
`
const Badge = styled.span`
    font-size:12px;
    font-weight:700;
    color:#FF7EB6;
    background-color:#FFE1ED;
    border-radius:20px;
    padding:2px 10px;
`