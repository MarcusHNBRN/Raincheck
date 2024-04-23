import styled from "styled-components";

export const StyledInput = styled.input`
  font-size: 16px;
  border: 1px solid black;
  height: 32px;
  background-color: white;
  margin-right: 16px;
  color: black;
`;

export const StyledButton = styled.button`
  text-align: center;
  font-size: 16px;
  padding: 8px 16px;
  color: black;
  border: none;
  cursor: pointer;
  background-color: white;
  transition: background-image 0.3s ease-out;

  &:hover {
    background-color: #006aff;
    color: white;
  }
`;
