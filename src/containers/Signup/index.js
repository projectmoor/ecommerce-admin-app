import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../UI/Input";
import { useSelector, useDispatch } from "react-redux"; // get state
import { Redirect } from "react-router-dom"; // get Redirect
import { signup } from "../../actions"; // get signup action

const Signup = () => {

  // form data <-> state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => { // sign up function
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user)); // dispatch sign up action
  };

  if (auth.authenticated) {
    // redirect if user logged in
    return <Redirect to={`/`} />
  }
  if(user.loading) {
    return <p>Loading...!</p>
  }

  return (
    <Layout>
      <Container fluid>
        { user.message }
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={ userSignup }>
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={{ span: 6 }}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                errorMessage="We'll never share your email with anyone else."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="passwor"
                placeholder="Password"
                value={password}
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

export default Signup;
