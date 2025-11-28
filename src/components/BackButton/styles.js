import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  top: 500px;
  left: 20px;
  background-color:  ${(props) => props.theme.purple};
;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #7b4390;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 18px;
    top: 560px;
    left: 15px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    top: 550px;
    left: 10px;
  }
`;
