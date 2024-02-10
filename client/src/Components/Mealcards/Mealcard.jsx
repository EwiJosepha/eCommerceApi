import { useQuery } from "@tanstack/react-query";
import './meal.css'

import axios from "axios";
// import Paginatte from "./Paginatte";

function Mealcard() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["productcard"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3000"
      );

      return res.data
    },
  });

  if (error) {
    return <h1>An error Occured</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  console.log(data);


  return (
    <>
      <div className="containerthumb">
        {data.map((item) => {
          return (
            <div className="top">
              <div className="subcard" id="subcards">
                {/* <Link to={`./Details/${item.id}`}> */}
                  <img src={item.productUrl} id="details-page"  alt=""/>
                {/* </Link> */}

                <i className="fa-regular fa-heart"></i>
              </div>

              <div className="snikersprice">
                <span id="snykers">{item.productName}</span>
                <span id="snykers-price">{item.productPrice}</span>
              </div>

              <div className="shoes-available">
                <p id="shoes"> 5 types of shoes available</p>
              </div>
              <div className="stars">
                <span id="star" className="fa-star">
                  {/* {item.rating} */}
                </span>
                <p id="number">{item.productQuantity}</p>
              </div>
              <div className="date">
                <button id="addtocard" className="addtocard" >
                  addtoCard
                </button>
                <button id="shortlist">Short List</button>
              </div>
            </div>
          );
        })}
       
      </div>
      <div className="previews">
         {/* <Paginatte
          postperpage={postperpage}
          totalposts={data.length}
          paginate={paginate}
        /> */}
      </div>
    </>
  );
}

export default Mealcard;
