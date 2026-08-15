import styled  from "@emotion/styled";
import { useRef,useState } from "react";
import { useTimer } from "react-timer-hook";


export function IdCode() {
    

    const [values,setValues] = useState(["","","","","",""]); // 인증번호 배열
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const CodeCheck = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return; // 숫자만 입력되게

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if(value && index <inputRefs.current.length-1){
            inputRefs.current[index+1]?.focus();
        }
    }

    const Timer = () => {
        const time = new Date(); // 지금시간 가져오기
        time.setSeconds(time.getSeconds() + 300); // 지금 시간 + 300초(5분) 후에 만료
        return time;
    }

    const {seconds, minutes, isRunning, restart} = useTimer({
        expiryTimestamp:Timer(),
        onExpire: () => console.log("인증시간 완료"),
    });

    const handleResend = () => {
        restart(Timer());
    };
    return(
        <Wrapper>
            <p style={{color:'#000'}}>인증번호 6자리 </p>
            <Div>
                {values.map((value, index) => (
                <Box
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => CodeCheck(e, index)}
                />
            ))}
            </Div>
            <Time>
                <p style={{ color: '#FF4C9A', fontSize: '13px' }}>
                    {minutes}:{seconds.toString().padStart(2,'0')}남음</p>
                <p
                    style={{
                        color: '#FF4C9A',
                        fontSize: '13px',
                        cursor: isRunning ? 'default' : 'pointer',
                        opacity: isRunning ? 0.5 : 1,
                    }}
                    onClick={!isRunning ? handleResend : undefined}
                >
                    인증번호 재전송
                </p>
            </Time>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction:column;

    gap: 10px;
`
const Box = styled.input`
    background-color:#FFE2EF;
    width: 60px;
    height: 65px;
    text-align: center;
    font-size: 20px;
    border: 2px solid ${(props) => (props.value ? '#FF7EB6' : '#FFC4DE')};
    border-radius: 8px;
    outline: none;
    font-family:inherit;
    
    `
const Div = styled.div`
    display:flex;
    justify-content:center;
    gap:8px;
`
const Time = styled.div`
    display:flex;
    justify-content:space-between;
`