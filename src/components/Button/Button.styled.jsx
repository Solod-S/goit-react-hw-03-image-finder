import styled from 'styled-components';
export const ButtonLoadMore = styled.button`
  position: relative;
  /* width: 125px; */
  align-items: center;
  margin: auto;
  padding: 8px 20px;
  display: block;

  letter-spacing: 0.06em;
  cursor: pointer;
  color: #d6d6d6;
  background-color: #444444;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.88;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  transition: transform 0.25s;
  :hover {
    transform: scale(1.1);
  }
`;
