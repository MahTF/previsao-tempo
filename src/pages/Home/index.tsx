import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { Container, Header, Main, SelectGroup, SelectUf, SelectCity, Info, Footer } from './styles';

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [UFs, setUFs] = useState(['SP', 'MG', 'RJ', 'RR', 'PR']);
  const [selectedUF, setSelectedUF] = useState<string>();
  const [cities, setCities] = useState(['Santos', 'São Vicente']);
  const [selectedCity, setSelectedCity] = useState<string>();

  useEffect(() => {
    axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => {
        const ufSigla = res.data.map(uf => uf.sigla).sort();
        setUFs(ufSigla);
      });
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(res => {
        const citiesList = res.data.map(city => city.nome).sort();
        setCities(citiesList);
      })
  }, [selectedUF]);

  function handleUfSelect(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUF(uf);
  }

  function handleCitySelect(event: ChangeEvent<HTMLSelectElement>) {
    const citySelect = event.target.value;

    setSelectedCity(citySelect);
  }

  return (
    <Container>
      <Header>
        <p>Bem-Vindo!</p>
      </Header>


      <Main>
        <SelectGroup>
          <SelectUf
            name="UF"
            id="UF"
            value={selectedUF}
            onChange={handleUfSelect}
          >
            <option value="" hidden>Selecione uma UF</option>
            {UFs.map(UF => {
              return <option value={UF} key={UF}>{UF}</option>
            })}
          </SelectUf>

          <SelectCity
            name="city"
            id="city"
            value={selectedCity}
            onChange={handleCitySelect}
          >
            <option value="" hidden>Selecione uma cidade</option>
            {cities.map(city => {
              return <option value={city} key={city}>{city}</option>
            })}
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
