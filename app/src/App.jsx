import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResult from './searchResults/SearchResult';


export const BASE_URL =  "http://localhost:9000";

const App = () => {
   const [data,setData]=useState(null);
   const [filteredData,setFilteredData]=useState(null);
   const [loading,setLoading]= useState(false);
   const [error,setError] = useState(null);
   const [selectedBtn,setSelectedBtn]=useState("all");

   
    useEffect(()=>{
      const FetchFoodData = async ()=>{
        setLoading(true);
         try {
          const response = await fetch(BASE_URL);
    
    
         const json = await response.json();
         setData(json);
         setFilteredData(json);
         setLoading(false);
         } catch (error) {setError("Unable to fetch data");}
         
    
       }
       FetchFoodData();
    }, [] );
      // console.log(data);

     const searchFood = (e)=>{
      const searchValue = e.target.value;
      console.log(searchValue);

      if(searchValue == ""){
         setFilteredData(null);
      };
       const filter = data?.filter((food)=>
       food.name.toLowerCase().includes(searchValue.toLowerCase()) 
       );
       
       setFilteredData(filter);

     };

     const filterFood = (type)=>{
      if(type === "all"){
        setFilteredData(data)
        setSelectedBtn("all")
        return;
      }
      const filter = data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase()) 
      );
      setFilteredData(filter);
      setSelectedBtn(type);

     }

     const filterBtns = [
      {
        name:"All",
        type:"all",
      },
      {
        name:"Breakfast",
        type:"breakfast"
      },
      {
        name:"Lunch",
        type:"lunch"
      },
      {
        name:"Dinner",
        type:"dinner"
      },
     ]
  

   if(error) return <div>{error}</div>;
   if(loading) return <div>loading...</div>
  return (
    <Container>
      <TopContainer>
        <div className="brand-logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className='search-bar'>
          <input onChange={searchFood} placeholder='Search Food...' />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((value)=>( <Button isSelected={selectedBtn==value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>))}
       
      
      </FilterContainer>

      <SearchResult data={filteredData}/>

    </Container>
  )
};

export default App;

const Container = styled.div`
  
  /* height: 241px; */
  /* width: 100vw; */
  margin: 0 auto;
`;
const TopContainer= styled.section`
 min-height: 100px;
 display: flex;
 justify-content: space-between;
 padding: 16px;
 align-items: center;

 .search-bar{
  input{
    background-color: transparent;
    border: 2px solid red;
    color: white;
    border-radius: 5px;
    width: 200px;
    height: 40px;
    padding: 0 10px;
    font-size: 16px;
    &::placeholder{
      color: white;
    }
  }
 }
 @media (0 < width < 600px){
  flex-direction: column;
  height: 120px;
 }
`;

const FilterContainer= styled.section`
display: flex;
gap: 12px;
justify-content: center;
padding-bottom: 40px;
`;
export const Button = styled.button`
background:${({isSelected})=> (isSelected? "#f91717":"#ff4343") };
outline:1px solid ${({isSelected})=> (isSelected? "white":"#ff4343") };
border-radius: 5px;
padding: 6px  12px;
border: none;
cursor: pointer;
color: white;
&:hover {
  background-color: #f91717;
}
`;


