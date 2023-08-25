import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./header";
import axios from "axios"; // Import axios for API requests
import Modal from "./modal"; // Import the Modal component

const keys = [
  "RootSumOfSquares",
  "MaxtoMinDifference",
  "PeakMagToRMS",
  "ZeroCrossRate",
  "MedianFrequency",
  "NORM-PB",
  "ENB-NORM",
  "PowerBandwidth",
  "EquivalentNoiseBandwidth",
  "MeanFrequency",
  "BandPower",
  "OccupiedBandwidth",
  "MFCC1",
  "MFCC2",
  "MFCC3",
  "MFCC4",
  "MFCC5",
  "MFCC6",
  "MFCC7",
  "MFCC8",
  "MFCC9",
  "MFCC10",
  "MFCC11",
  "MFCC12",
  "MFCC13",
  "MFCC14",
  "MFCC15",
  "MFCC16",
  "MFCC17",
  "MFCC18",
  "MFCC19",
  "MFCC20",
  "MFCC21",
  "MFCC22",
  "MFCC23",
  "MFCC24",
  "MFCC25",
  "MFCC26",
  "MFCC27",
  "MFCC28",
  "MFCC29",
  "MFCC30",
  "MFCC31",
  "MFCC32",
  "MFCC33",
  "MFCC34",
  "MFCC35",
  "MFCC36",
  "MFCC37",
  " MFCC38",
  " MFCC39",
];

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [apiResponse, setApiResponse] = useState("");

  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/predict_data",
        JSON.stringify(data), // Convert data to JSON string
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      response.data==0?setApiResponse('ABNORMAL'):setApiResponse('NORMAL');
      setModalOpen(true);
    } catch (error) {
      console.error("Error sending API request:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const customNumberValidator = (value) => {
    // Perform custom number validation here
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue);
  };
  return (
    <div className="formcon">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        {keys.map((item) => (
          <div key={item} className="el">
            <label className="la" htmlFor={item}>
              {item}
            </label>
            <input
              key={item}
              type="text"
              step="any"
              {...register(item, {
                required: true,
                validate: customNumberValidator,
              })}
              placeholder=""
            />
          </div>
        ))}

        {/* output */}
        <p>{data}</p>
        <p className="e">{errors.item?.message}</p>
        <div className="buttcon">
          <input type="submit" />
        </div>
      </form>
      <Modal isOpen={modalOpen} onClose={closeModal} responseText={apiResponse} />
    </div>
  );
}
