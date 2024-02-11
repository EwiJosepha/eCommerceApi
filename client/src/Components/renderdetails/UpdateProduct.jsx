import React, { useEffect, useState } from 'react'

function UpdateProduct({data}) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productQuantity: '',
    productUrl: '',
    categoryId: '',
    similarProduts: '',
    productCategory: ''

  })

  useEffect((
    setFormData({
      productId: data.input1 || '',
      productName: data.input2 || '',
      productQuantity: data.input3 || '',
      productUrl: data.input4 || '',
      categoryId:  data.input5 || '',
      similarProduts: data.similarProducts || '',
      productCategory: data.input7 || ''

    })
  ),[data])
  const[update, setUpdate] = useState(true)



  function isUpdateTrue () {
    setUpdate(false)
}
  return (
    <div>
            <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '30px',
            padding: '50px',
            background: '#FFD3F8'
          }}>
            <button onClick={UpdateProduct} style={{ background: '#303e6f', borderRadius: '8px', border: 'none', padding: '10px', color: '#fff' }}>Update Product</button>
          </div>
    </div>
  )
}

export default UpdateProduct
