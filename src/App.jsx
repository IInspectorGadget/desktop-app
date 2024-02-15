import { useState, useRef, useEffect, useCallback } from 'react'
import './App.sass'
import WidgetComponent from './components/WidgetComponent/WidgetComponent';
import useMove from "./customHooks/useMove";
import { createCord } from './utils/utils'
import useLocalStorage from './customHooks/useLocalStorage';

function createWidgetConf(name,cord,width){
  return {name, cord, width}
}

const conf = {
  calendar: createWidgetConf("calendar", createCord(0,0), 300),
  toDoList: createWidgetConf("toDoList", createCord(500,500), 300),
  clock: createWidgetConf("clock", createCord(300,300), 300),
}


function App() {

  const [itemsConf, setItemsConf] = useLocalStorage("itemsConf", conf)
  
  const {itemsCord, startCapture, endCapture, ref} = useMove(itemsConf, setItemsConf)

  


  return (
    <main ref={ref} onMouseUp={endCapture} className="main">
      <WidgetComponent onMouseDown={startCapture} conf = {itemsCord.calendar}>{itemsCord.calendar.name}</WidgetComponent>
      <WidgetComponent onMouseDown={startCapture} conf = {itemsCord.toDoList}>{itemsCord.toDoList.name}</WidgetComponent>
      <WidgetComponent onMouseDown={startCapture} conf = {itemsCord.clock}>{itemsCord.toDoList.name}</WidgetComponent>
    </main>
  )
}

export default App
