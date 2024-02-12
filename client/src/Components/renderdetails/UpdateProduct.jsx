import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateProduct({ data }) {
  const [updatemodal, setUpdatemodal] = useState(true);
  const [deleteProd, setDeleteProd] = useState()

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productQuantity: "",
    productUrl: "",
    categoryId: "",
    // similarProduts: "",
    productCategory: "",
  });

  useEffect(()=>
    setFormData({
      productId: data.productId || "",
      productName: data.productName || "",
      productQuantity: data.productQuantity || "",
      productUrl: data.productUrl || "",
      categoryId: data.categoryId || "",
      // similarProduts: data.similarProduts || "",
      productCategory: data.productCategory || "",
    }),
    [data]
  );
    
  function isUpdateTrue() {
    setUpdatemodal(false);
  }

  function closemodal () {
    setUpdatemodal(true)
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function deletefunction() {
    const productId = formData.productId
    setDeleteProd(data = {})


    try {
      const deleteVals = await axios.delete(`http://localhost:3000/delete/${productId}`)
      console.log(data);
      console.log(deleteVals);

    } catch (err) {
      if (err) {
        console.log("not deleted", err.message);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProducted = {
        productId: data.productId,
        productName: data.productName,
        productQuantity: data.productQuantity,
        productUrl: data.productUrl,
        categoryId: data.categoryId,
        productCategory: data.productCategory,
      };

      const updateValues = await axios.post(
        `http://localhost:3000/${updatedProducted.productId}/update`,
        updatedProducted,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Meal updated successfully:", updateValues.data);
      console.log(updatedProducted);
    } catch (err) {
      console.log(err.message);
    }
  }



  // const handleSimilarProductChange = (index, key, value) => {
  //   const newSimilarProducts = [...similarProducts];
  //   newSimilarProducts[index] = { ...newSimilarProducts[index], [key]: value };
  //   setSimilarProducts(newSimilarProducts);
  // };

  // const handleSimilarProductAdd = () => {
  //   setSimilarProducts([...similarProducts, { key: "", value: "" }]);
  // };

  return (
    <div>
      {updatemodal ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "30px",
            padding: "50px",
            background: "#FFD3F8",
          }}
        >
          <button
            onClick={isUpdateTrue}
            style={{
              background: "#303e6f",
              borderRadius: "8px",
              border: "none",
              padding: "10px",
              color: "#fff",
            }}
          >
            Update Product
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          background: '#FFD3F8',
          color: '#303e6f'
        }}>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "300px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingBottom: "10px", width: '100%' }}>
            <label
              style={{ marginBottom: "2px", fontSize: "25px", fontWeight: 400, width: '40%',  textAlign: "right",
              paddingRight: "10px", }}
            >
              ProductId:
              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px", width: '60%' }}
              />
            </label>
          </div>
          <div style={{ paddingBottom: "10px",width: '100%' }}>
            <label
              style={{
                marginBottom: "2px",
                fontSize: "25px",
                fontWeight: 400,
                textAlign: "right",
                paddingRight: "10px",
                width:'40%'
              }}
            >
              ProdName:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px", width:'60%' }}
              />
            </label>
          </div>
          <div style={{ paddingBottom: "10px", width: '100%' }}>
            <label
              style={{
                marginBottom: "2px",
                fontSize: "25px",
                fontWeight: 400,
                textAlign: "right",
                paddingRight: "10px",
                width: '40%'
              }}
            >
              productQuantity:
              <input
                type="text"
                name="productQuantity"
                value={formData.productQuantity}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px",width: '60%' }}
              />
            </label>
          </div>
          <div style={{ paddingBottom: "10px",width: '100%' }}>
            <label
              style={{
                marginBottom: "2px",
                fontSize: "25px",
                fontWeight: 400,
                textAlign: "right",
                paddingRight: "10px",
                width: '40%'
              }}
            >
              ProductUrl:
              <input
                type="text"
                name="productUrl"
                value={formData.productUrl}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px",width: '60%' }}
              />
            </label>
          </div>
          <div style={{ paddingBottom: "10px",width: '100%' }}>
            <label
              style={{
                marginBottom: "2px",
                fontSize: "25px",
                fontWeight: 400,
                textAlign: "right",
                paddingRight: "10px",
                width: '40%'
              }}
            >
              categoryId:
              <input
                type="text"
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px", width: '60%' }}
              />
            </label>
          </div>
          {/* <div>
          <h3>Similar Products:</h3>
          {similarProducts?.map((similarProduct, index) => (
            <div key={index}>
              <input
                type="text"
                value={similarProduct.key}
                onChange={(e) =>
                  handleSimilarProductChange(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                value={similarProduct.value}
                onChange={(e) =>
                  handleSimilarProductChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleSimilarProductAdd}>
            Add Similar Product
          </button>
        </div> */}

          <div style={{ paddingBottom: "10px",width: '100%' }}>
            <label
              style={{
                marginBottom: "2px",
                fontSize: "25px",
                fontWeight: 400,
                textAlign: "right",
                paddingRight: "10px",
                width: '40%'
              }}
            >
              ProductCategory:
              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={(e) => handleChange(e)}
                style={{ padding: "8px" ,width: '60%'}}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100px",
              }}
            >
              Submit
            </button>
            <br />
            <div style={{display: 'flex', gap:'40px'}}>
            <button
            type="button"
              onClick={deletefunction}
              style={{
                background: "#303e6f",
                borderRadius: "8px",
                border: "none",
                padding: "8px",
                color: "#fff",
                marginBottom: "100px",
                float: "left",
              }}
            >
              Delete Product
            </button>
            <button
            type="button"
              onClick={closemodal}
              style={{
                background: "#303e6f",
                borderRadius: "8px",
                border: "none",
                padding: "8px",
                color: "#fff",
                marginBottom: "100px",
                float: "right",
              }}
            >
              close modal
            </button>
            </div>
            <br />
          </div>
        </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
