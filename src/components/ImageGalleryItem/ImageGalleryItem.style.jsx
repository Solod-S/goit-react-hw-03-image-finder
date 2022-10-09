import styled from 'styled-components';
export const ImageGalleryItemLi = styled.li`
  background-color: #d6d6d6;
  width: 350px;
  height: 233px;
  margin: 15px;

  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.06),
    1px 4px 6px rgba(0, 0, 0, 0.16);

  object-fit: contain;
  object-position: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s;

  :hover {
    transform: scale(1.1);
  }
`;
export const ImageGalleryItemImg = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.25s;

  ${ImageGalleryItemLi}:hover & {
    transform: scale(1.2);
  }
`;
