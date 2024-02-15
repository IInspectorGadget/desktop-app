import { useState, useRef, useEffect, useCallback } from 'react'
import './App.sass'
import WidgetComponent from './components/WidgetComponent/WidgetComponent';
import useMove from "./customHooks/useMove";
import { createCord } from './utils/utils'
import useLocalStorage from './customHooks/useLocalStorage';

function createWidgetConf(name,cord,width, height){
  return {name, cord, width, height}
}

const conf = {
  calendar: createWidgetConf("calendar", createCord(0,0), 300, 300),
  toDoList: createWidgetConf("toDoList", createCord(500,500), 300, 300),
  clock: createWidgetConf("clock", createCord(300,300), 300, 300),
}


function App() {

  const [itemsConf, setItemsConf] = useLocalStorage("itemsConf", conf)
  
  const {startCapture, endCapture, ref} = useMove(itemsConf, setItemsConf)

  return (
    <main ref={ref} onMouseUp={endCapture} className="main">
      <WidgetComponent root ={ref} onMouseDown={startCapture} name = {itemsConf.calendar.name} itemsConf = {itemsConf} setItemsConf = {setItemsConf}>{itemsConf.calendar.name} </WidgetComponent>
      <WidgetComponent root ={ref} onMouseDown={startCapture} name = {itemsConf.toDoList.name} itemsConf = {itemsConf} setItemsConf = {setItemsConf}>{itemsConf.toDoList.name}</WidgetComponent>
      <WidgetComponent root ={ref} onMouseDown={startCapture} name = {itemsConf.clock.name} itemsConf = {itemsConf} setItemsConf = {setItemsConf}>{itemsConf.clock.name}</WidgetComponent>
    </main>
  )
}

export default App
