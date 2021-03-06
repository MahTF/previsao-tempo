import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { Container, Header, Main, SelectGroup, SelectUf, SelectCity, Info, Footer } from './styles';

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface ClimatempoResponse {
  id: number;
  data: {
    temperature: number;
    sensation: number;
    icon: string;
    condition: string;
    date: string;
  }
}

const Home = () => {
  const [UFs, setUFs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>();
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [id, setId] = useState(0);
  const [temperature, setTemperature] = useState(20);
  const [sensation, setSensation] = useState(18);
  const [icon, setIcon] = useState('2n');
  const [condition, setCondition] = useState("Noite com nuvens");
  const [date, setDate] = useState("13-01-2021 18:00");

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
      });
  }, [selectedUF]);

  useEffect(() => {
    if (selectedCity !== undefined) {
      axios.get(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${selectedCity}&state=${selectedUF}&country=BR&token=${process.env.REACT_APP_CLIMATEMPO_TOKEN}`)
        .then(res => {
          setId(res.data[0].id);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (id !== 0) {
      // const headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Authorization", "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE", "Content-Type": "application/json;charset=UTF-8" }
      // const localeId: number[] = [id];
      // axios.put(`http://apiadvisor.climatempo.com.br/api-manager/user-token/${process.env.REACT_APP_CLIMATEMPO_TOKEN}/locales`,
      //   headers);
      // Corrigir isso. 
      getWeather(id);
    }
  }, [id]);

  function handleUfSelect(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUF(uf);
  }

  function handleCitySelect(event: ChangeEvent<HTMLSelectElement>) {
    const citySelect = event.target.value;

    setSelectedCity(citySelect);
  }

  function getWeather(id: number) {
    axios.get<ClimatempoResponse>(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${process.env.REACT_APP_CLIMATEMPO_TOKEN}`)
      .then(res => {
        setTemperature(res.data.data.temperature);
        setSensation(res.data.data.sensation);
        setIcon(res.data.data.icon);
        setCondition(res.data.data.condition);
        setDate(res.data.data.date);
      });
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
            disabled={!selectedUF}
          >
            <option value="" hidden>Selecione uma cidade</option>
            {cities.map(city => {
              return <option value={city} key={city}>{city}</option>
            })}
          </SelectCity>
        </SelectGroup>

        <Info>
          <p><span>{temperature}º</span> Temperatura</p>
          <p><span>{sensation}º</span> Sensação</p>

          <img src={`https://www.climatempo.com.br/dist/images/v2/svg/${icon}.svg`} alt="favicon" />
          <p>{condition}</p>
        </Info>
      </Main>

      <Footer >
        <p>Horário da Consulta: <span>{date}</span></p>
      </Footer>
    </Container>
  )
}

export default Home;
