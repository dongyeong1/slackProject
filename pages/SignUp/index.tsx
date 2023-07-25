// import useInput from '@hooks/useInput';
import useInput from '@hooks/useInput'

import React, { useCallback, useState, VFC } from 'react';
import axios from 'axios';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './style';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr'
import fetcher from '@utils/fetcher';
//리렌더링이 화면을다시그리는것이아니라 달라진것을 계속 계산해서 업데이트하기때문에 useCallback을사용한다\]'
const SignUp = () => {
    const {data,error,mutate} =useSWR('/api/users',fetcher)//앞의 주소가 fetcher함수의 매개변수로넘어간다.
   //fetcher는 앞에적은주소를 어떻게처리할까?하는 함수
// const [email,setEmail]=useState('');
// const [email,onChangeEmail]=useInput('')
const [email,setEmail]=useState('')
const [nickname,onChangeNickname]=useInput('')
const [password, ,setPassword]=useInput('');
const [passwordCheck, ,setPasswordCheck]=useInput('')
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangeEmail=useCallback((e:any)=>{
      console.log('asd',e.target.value)
      setEmail(e.target.value);

  },[])

  const onChangePassword = useCallback(
    (e:any) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
      //원래 꺼랑 같지않으면 true로바뀜 같아지면 false로 바뀐다
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e:any) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );


    const onSubmit=useCallback((e:any)=>{
        
        e.preventDefault();

        console.log('email',email,'asd')
    
        console.log('password',password)
    
        console.log('nickname',nickname)

        if(!mismatchError){
            console.log('서버로 회원가입하기')
            if(!mismatchError){
                setSignUpError('')
                setSignUpSuccess(false)
                axios.post('/api/users',{
                    email,
                    nickname,
                    password,
                })
                .then((res)=>{
                    console.log(res)
                    setSignUpSuccess(true)
                })
                .catch((error)=>{
                    console.log(error.response)
                    setSignUpError(error.response.data)
                }) 
                .finally(()=>{
    
                })
            }
           
        }
    },[email,nickname,password,mismatchError])

        // const onSubmit=useCallback(
        // (e)=>{
        //     e.preventDefault();
        //     console.log(email)
        // },[]
        // );
//   const onSubmit = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (!mismatchError && nickname) {
//         console.log('서버로 회원가입하기');
//         setSignUpError('');
//         setSignUpSuccess(false);
//         axios
//           .post('/api/users', {
//             email,
//             nickname,
//             password,
//           })
//           .then((response) => {
//             console.log(response);
//             setSignUpSuccess(true);
//           })
//           .catch((error) => {
//             console.log(error.response);
//             setSignUpError(error.response.data);
//           })
//           .finally(() => {});
//       }
//     },
//     [email, nickname, password, passwordCheck, mismatchError],
//   );

//   if (data === undefined) {
//     return <div>로딩중...</div>;
//   }

//   if (data) {
//     return <Redirect to="/workspace/sleact/channel/일반" />;
//   }
if(data===undefined){
    return <div>로딩중</div>
}
if(data){
    return <Redirect to="/workspace/sleact/channel/일반"/>
}


  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
