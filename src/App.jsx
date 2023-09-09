import './App.css'
import Input from './components/Input';
import { useState,useEffect, useRef } from 'react';
import {BiRectangle} from 'react-icons/bi'
import {HiOutlinePencil} from 'react-icons/hi'
import {AiOutlineLine} from 'react-icons/ai'
import {MdOutlineRotateRight} from 'react-icons/md'
import {MdOutlineRotateLeft} from 'react-icons/md'
import {BiText} from 'react-icons/bi'
import {BsArrowDownLeft} from 'react-icons/bs'
import {FaRegHandPaper} from 'react-icons/fa'
import {BsEraser} from 'react-icons/bs'


function App() {
  const [url, setUrl] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLineDrawing, setIsLineDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.9; // Adjust canvas width to the desired size
    canvas.height = window.innerHeight * 0.9; // Adjust canvas height to the desired size
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, []);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    background(e);

    
  }

  const background = (e) => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    console.log(canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      // Draw the new image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
    };
  }

  const setDrawingMode = () => {
    setIsDrawing(!isDrawing);
    console.log('isDrawing',isDrawing)
  }

  const setLineMode = () => {
    setIsLineDrawing(!isLineDrawing);
    console.log('isLineDrawing',isLineDrawing)
  }

  const startDrawing = (e) => {
    if(isDrawing){
    console.log(e);
    const { offsetX, offsetY } = e.nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
    console.log('startX',startX)
    console.log('startY',startY)
    }else if(isLineDrawing){
      console.log('isLineDrawing',e);
      const { offsetX, offsetY } = e.nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing || !isLineDrawing) return;
    console.log(e);
    const { offsetX, offsetY } = e.nativeEvent;
    setEndX(offsetX);
    setEndY(offsetY);
    console.log('start', startX, startY);
    console.log('moving', endX, endY);
    // drawRectangle(startX, startY, offsetX, offsetY);
    
  }

  const drawLine = () => {
    if (!isLineDrawing || startEndCoordinatesNull()) return;

    const context = contextRef.current;
    
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
  
  const handleMouseUp = (e) => {
    setIsDrawing(false);
    setEndX(null);
    setEndY(null);
    if(isDrawing){
      drawRectangle();
    } else if(isLineDrawing){
      drawLine();
    }
    
  }
  
  const drawRectangle = () => {
    if (!isDrawing || startEndCoordinatesNull()) return;

    const context = contextRef.current;
    
    const rectWidth = endX - startX;
    const rectHeight = endY - startY;

    context.strokeRect(startX, startY, rectWidth, rectHeight);
  };

  // useEffect(drawRectangle);

  const startEndCoordinatesNull = () => {
    return startX === null || startY === null || endX === null || endY === null;
  };

  const doNothing = (e) => {
    console.log('do nothing');
  }

  return (
    <>
    <div className='flex flex-col h-[100vh] w-full'>
      <div className='bg-neutral-800 w-full flex h-[10%] justify-start items-center p-5' > 
      <input type="text" className='rounded-xl h-[35px] w-full' placeholder="URL" onChange={handleInputChange} /> {/* Remove the parentheses here */}
      </div>
      <div className='bg-neutral-500 flex h-[95%] items-center justify-center'>
        <canvas 
        id="canvas" 
        className='h-[90%] w-[90%] bg-neutral-600 rounded-xl'
         ref={canvasRef} 
         onMouseDown={startDrawing}  
         onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>

        </canvas>
      </div>
      <div className='h-[5%] bg-neutral-700 flex justify-center'>
        <div className='bg-neutral-700  flex items-center'>
        <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <MdOutlineRotateLeft color='white' /> </button>
          <button onClick={setDrawingMode} className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <BiRectangle color='white' /> </button>
          <button onClick={setLineMode} className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <HiOutlinePencil color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <AiOutlineLine color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <BsEraser color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <BiText color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <BsArrowDownLeft color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <FaRegHandPaper color='white' /> </button>
          <button className='bg-neutral-800 h-full p-2 w-[35px] rounded-xl flex items-center justify-center'> <MdOutlineRotateRight color='white' /> </button>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default App 