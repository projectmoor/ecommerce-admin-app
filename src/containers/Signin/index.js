import { React, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../UI/Input";
// redux
import { login } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const Signin = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useSelector(state => state.auth) // get state

  const dispatch = useDispatch()

  const userLogin = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }
    
    dispatch(login(user));
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={ userLogin }>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                errorMessage="We'll never share your email with anyone else." 
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                label="Password" 
                type="passwor" 
                placeholder="Password" 
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
