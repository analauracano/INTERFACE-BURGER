import styled from "styled-components";

export const Container = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 12px;
  border-radius: 8px;

  border: 1px solid #dddddd;
  background-color: #ffffff;

  cursor: pointer;
  font-weight: 500;
  font-size: 15px;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 22px;
    height: 22px;
  }
`;
