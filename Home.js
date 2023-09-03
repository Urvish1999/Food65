import React,{useEffect,useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Box from '../components/Box';
import Carousel from '../components/Carousel';

export default function Home() {
    const[FoodCat, setFoodCat] = useState([])
    const[Fooditem, setFooditem] = useState([])
    
    const loadData =async () =>{
      let response = await fetch ("http://localhost:4000/api/foodData",{
      method:"POST",
      headers: { 
        "content-Type" : "application/json"
    }
      });
      response = await response.json();
      setFooditem(response[0]);
      setFoodCat(response[1]);

      console.log(response[0],response[1]);
  }
  useEffect(()=>{
  loadData()          
  }, [])

  return (
    <>
    
      <div className= "bg-success">
        <Navbar /></div>
        <div><Carousel/></div>
        <div className = "container-expand  bg-dark " >
          {
            FoodCat !==[]?FoodCat.map((data)=>{
             return ( <div className="row mb-3">
              <div key ={ data._id} className= "fs-3 m-3  text-white"> {data.CategoryName}</div>
              <hr/>
              {Fooditem !== []? Fooditem.filter((iteam)=>iteam.CategoryName === data.CategoryName)
              .map(filterItems=>{
                return(
                  <div key={filterItems._id} className="col-12 col-md-6 mb-3 col-lg-3 ">
                    <Box foodItem = {filterItems}
                    options = {filterItems.options[0]}
                     ></Box>
                    </div>
                )
              }

              ): <div> No data </div>}
               </div>
             )
            })
            : " "
            }
          </div>
          
      <div><Footer />
      </div>

    </>
  );
}
