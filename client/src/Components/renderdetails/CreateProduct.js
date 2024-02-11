import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [modalVisible, setModalVisible] = useState(true);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input7, setInput7] = useState('');
  const [similarProducts, setSimilarProducts] = useState([])



  const handleSimilarProductChange = (index, key, value) => {
    const newSimilarProducts = [...similarProducts];
    newSimilarProducts[index] = { ...newSimilarProducts[index], [key]: value };
    setSimilarProducts(newSimilarProducts);
  };

  const handleSimilarProductAdd = () => {
    setSimilarProducts([...similarProducts, { key: '', value: '' }]);
  };

  const handleCreateClick = () => {
    setModalVisible(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        productId:input1,
        productName:input2,
        productQuantity:input3,
        productUrl:input4,
        categoryId:input5,
        similarProduts:similarProducts,
        productCategory:input7
      };

      console.log('Form Data:', formData);
      const response = await axios.post("http://localhost:3000/post", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Meal created successfully:', response.data);

    } catch (err) {
      console.log(err.message);

    }


  }



  return (
    <div>

      <h1 style={{ color: '#303e6f', textAlign: 'center', padding: '30px' }}>Register Product Details here! Thank you!.</h1>

      <div>
        {modalVisible ? (
          <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '30px',
            padding: '50px',
            background: '#FFD3F8'
          }}>
            <button onClick={handleCreateClick} style={{ background: '#303e6f', borderRadius: '8px', border: 'none', padding: '10px', color: '#fff' }}>Creat Product</button>
          </div>
        ) : (

          <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            background: '#FFD3F8',
            color: '#303e6f'
          }}>
            <form onSubmit={handleSubmit} style={{
              maxWidth: '300px',
              height: '100%'
            }}>

              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400 }}>
                  ProductId:
                  <input
                    type="text"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400, display: 'flex' }}>
                  ProdName:
                  <input
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400, display: 'flex' }}>
                  Quantity:
                  <input
                    type="text"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400, display: 'flex' }}>
                  ProductUrl:
                  <input
                    type="text"
                    value={input4}
                    onChange={(e) => setInput4(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400, display: 'flex' }}>
                  categoryId:
                  <input
                    type="text"
                    value={input5}
                    onChange={(e) => setInput5(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div>
                <h3>Similar Products:</h3>
                {similarProducts?.map((similarProduct, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={similarProduct.key}
                      onChange={(e) => handleSimilarProductChange(index, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      value={similarProduct.value}
                      onChange={(e) => handleSimilarProductChange(index, 'value', e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleSimilarProductAdd}>Add Similar Product</button>
              </div>


              <div style={{ paddingBottom: '10px' }}>
                <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400, display: 'flex' }}>
                  ProdCategory:
                  <input
                    type="text"
                    value={input7}
                    onChange={(e) => setInput7(e.target.value)}
                    style={{ padding: '8px' }}
                  />
                </label>
              </div>
              <div>
                <button type="submit" style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100px'
                }}>Submit</button><br />
                <button onClick={handleCreateClick} style={{ background: '#303e6f', borderRadius: '8px', border: 'none', padding: '8px', color: '#fff', marginBottom: '100px', float: 'right' }}>close modal</button><br />
              </div>
            </form>

          </div>
        )}
      </div>

    </div>
  )
}

export default CreateProduct
