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

export const ExternalCircle = styled.button`
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
`;

export const PokemonContainer = styled.div`
  height: 100%;
  width: 7rem;
  margin: 15px;
  border-radius: 0.5rem;
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
  height: fit-content;
  width: fit-content;
  padding: 5px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 1rem;
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



