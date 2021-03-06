import styled from "styled-components";

export const Header = styled.div`
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

export const MiddleContainer = styled.div`
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: black;
  position: relative;
`;

export const ExternalCircle = styled.div`
  height: 110px;
  position: absolute;
  right: 47%;
  left: 47%;
  padding: 20px;
  margin-top: -20px;
  margin-bottom: -10px;
  border-radius: 50%;
  background-color: black;
  align-items: center;
  border-style: hidden;
  @media(max-width: 1380px) {
    right: 44vw;
  }
`;

export const MiddleCircle = styled.button`
  height: 90px;
  padding: 35px;
  margin-top: -10px;
  margin-left: -8px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: white;
  color: #fff;
  border-style: hidden;
`;

export const Title = styled.p`
  color: white;
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  background-color: whitesmoke;
`;

export const Content = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 30px;
  font-size: 30px;
  width: 500px;
  min-height: 600px;
  height: 100%;
  margin: 30px;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  display: grid;
  grid-template-columns: auto auto auto;
  @media(max-width: 1380px) {
    width: 300px;
    grid-template-columns: auto auto ;
  }
`;

export const Card = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  margin: 15px 0;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  text-align: center;
`;

export const PokemonContainer = styled.div`
  height: fit-content;
  width: 7rem;
  margin: 15px;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export const HistoryContainer = styled.div`
  min-height: 8rem;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 15px;
  color: #000;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 20px 20px 0;
`;

export const Search = styled.input`
  border: 1px solid rgba(0, 0, 0, 1);
  padding: 10px;
  width: 100%;
  font-size: 15px;
  display: inline-block;
  border-radius: 0.5rem;
  background-color: transparent;
`;

export const TradeButton = styled.button`
  height: 100px;
  width: 100px;
  border-radius: 1rem;
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: green;
  transition: 0.3s;
  &:hover {
    background-color: #064606;;
  }
`;
export const ConfirmButton = styled.button`
  padding: 5px;
  right: 0;
  border-radius: 0.5rem;
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background-color: green;
  transition: 0.3s;
  &:hover {
    background-color: #064606;;
  }
`;

export const SearchButton = styled.button`
  height: 2.5rem;
  width: 3rem;
  margin-left: 10px;
  border-radius: 0.5rem;
  background-color: transparent;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(255, 251, 0, 0.6);;
  }
`;



