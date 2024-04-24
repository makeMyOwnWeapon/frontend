import React from 'react';
import { Container, Form, Input, Button, Title } from '../styles/SignupStyles';
import { MainContainer } from '../styles/MainStyles';

function Signup() {
  return (
    <Container>
      <Form>
      <Title>Sign Up</Title>

        <Input type="text" placeholder="name" />
        <Input type="email" placeholder="e-mail" />
        <Input type="password" placeholder="password" />
        <Button type="submit">Join</Button>
      </Form>
    </Container>
  );
}

export default Signup;
