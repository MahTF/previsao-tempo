import React from 'react';

import { Container, Header, Main, SelectGroup, SelectUf, SelectCity, Info, Footer } from './styles';

const Home = () => {
  return (
    <Container>
      <Header>
        <p>Bem-Vindo!</p>
      </Header>


      <Main>
        <SelectGroup>
          <SelectUf name="UF" id="UF">
            <option value="Padrao" selected unselectable='on'>Selecione uma unidade federativa</option>
            <option value="MG">Minas Gerais</option>
            <option value="SP">São Paulo</option>
            <option value="PR">Paraná</option>
          </SelectUf>

          <SelectCity name="city" id="city">
            <option value="Padrao" selected unselectable='on'>Selecione uma cidade</option>
            <option value="Santos">Santos</option>
            <option value="Lorena">Lorena</option>
            <option value="Campo Mourao">Campo Mourão</option>
            <option value="Juiz de Fora">Outside Judge</option>
          </SelectCity>
        </SelectGroup>

        <Info>
          <p>Temperatura</p>
          <p>Sensação</p>

          <img src="https://www.climatempo.com.br/dist/images/v2/svg/2.svg" alt="favicon" />
          <p>condição</p>
        </Info>
      </Main>

      <Footer >
        <p>Horário da Consulta: <span>{Date.now()}</span></p>
      </Footer>
    </Container>
  )
}

export default Home;
