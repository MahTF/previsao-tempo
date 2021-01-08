import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  width: 90vw;
  margin: 0;
  padding: 0;
`;

export const Header = styled.header``;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectGroup = styled.div`
  width: 50%;
  padding: 10px;
`;

export const SelectUf = styled.select`
  width: 30%;
`;

export const SelectCity = styled.select`
  width: 65%;
  margin-left: 10px;
`;

export const Info = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  bottom: 0;
  justify-content: flex-end;
`;
