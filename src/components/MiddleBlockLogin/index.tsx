import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../common/Input";

const serverURL = process.env.REACT_APP_SERVER_DOMAIN

interface MiddleBlockProps {
  title: string;
  button: string;
  t: TFunction;
}

const MiddleBlock = ({ title, button, t }: MiddleBlockProps) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    // Simple validation
    if (!username || !password) {
      setErrorMessage('Username and Password are required');
      return;
    }

    try {
      // Send login request to the API
      const response = await fetch(serverURL+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        if (response.status == 401){
          throw new Error('Incorrect Username or Password');
        }
        else{
          throw new Error('Login failed');
        }
        
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage

      // Redirect to the main page
      navigate('/banking');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setErrorMessage(errorMessage);
    }
  };


  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <MiddleBlockSection>
      <Slide direction="up" triggerOnce>
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              
              <div>
            <div>
              <Input

                name=""
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

              />

            </div>
            <div className="form-floating mb-4">
              <Input
                name=""
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            <div className="d-flex align-items-center justify-content-between mb-4">
            </div>

            <div id="error-message" className="text-danger">{errorMessage}</div>
          </div>

              {button && (
                <Button name="submit" onClick={handleLogin}>
                  {t(button)}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
