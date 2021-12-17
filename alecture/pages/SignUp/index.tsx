import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import { Header, Error, Form, Label, Input, LinkContainer, Button } from './styles';

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );
  /**
   * useCallback : caching 하는 것
   * 언제까지 캐싱 ? : 아래 deps들이 변할 때 까지 캐싱해두어라
   * useCallback으로 감싸지 않으면 함수들이 매먼 리렌더링 된다.
   *
   * 리렌더링 : 화면 전체를 다리 그리는 것은 아님
   */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        console.log('서버로 회원가입 하기');
      }
    },
    [email, nickname, password, passwordCheck, mismatchError], // deps에 위 함수가 쓰이는 변수들을 다 넣어줘야 함, 그래야지 update가 됨
  );
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
          {/* {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>} } */}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
