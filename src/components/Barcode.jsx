import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [info, setinfo] = useState(null)
  useEffect(()=>{
    const fetchBarcode = async ()=>{
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        const data = await res.json()
        console.log(data)
        setinfo(data.product)
    }
    fetchBarcode()
  },[barcode])
  return (
    <div>
      <h1>Scan Barcode</h1>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setBarcode(result.text);
        }}
      />
      <p>Scanned Code: {barcode}</p>
      {
        info&& <h1>{info.brands}</h1>
      }
      {info && <img src={info.image_front_url} alt="" /> }
    </div>
  );
};

export default BarcodeScanner;
