import { useEffect, useState, useRef } from 'react'
import './App.css'
import { URL } from './constants'
import RecentSearch from './components/RecentSearch'
import QuesAnsBody from './components/QuesAnsBody'


function App() {
  const[question,setQuestion]=useState('');
  const[result,setResult]=useState([]);
  const [recentHtry,setRecenthtry]=useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHtry,setSelectedhtry]=useState('')
  const scrollToAns=useRef();
  const [loading,setLoading]=useState(false)
  const [isOpen,setIsOpen]=useState(false)

 
  const askQuestion= async()=>{

    if(!question && !selectedHtry){
      return false
    }
    if(question){
      if(localStorage.getItem('history')){
        let history=JSON.parse(localStorage.getItem('history'));
        history=[question,...history]
        localStorage.setItem('history',JSON.stringify(history))
        setRecenthtry(history)
      }else{
        localStorage.setItem('history',JSON.stringify([question]))
        setRecenthtry([question])
      }
    }
    
    const payloadData=question?question:selectedHtry
    const payload={
      "contents": [
        {
          "parts": [
            {
              "text": payloadData
            }
          ]
        }
      ]
    }

    setLoading(true)
    let response=await fetch(URL,{
      method:"POST",
      body:JSON.stringify(payload)
    })
    response=await response.json()
    let dataString=response.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())
    setResult([...result,{type:'q',text:question?question:selectedHtry},{type:'a',text:dataString}])
    setQuestion('')
    setTimeout(()=>{
      scrollToAns.current.scrollTop=scrollToAns.current.scrollHeight;

    },500);
    setLoading(false)
  }

 
  const isEnter=(event)=>{
    if(event.key=='Enter'){
      askQuestion();
    }
  }
  useEffect(()=>{
    askQuestion()

  },[selectedHtry])


  //dark mode feature arrangement
  const[darkMode,setDarkMode]=useState("dark");
  useEffect(()=>{
    if(darkMode=='dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')

    }
  },[darkMode])
  
  


  return (
  <div className={darkMode=='dark'?'dark':'light'}>
   <div className='grid grid-cols-5 h-screen text-center'>
      <select onClick={(event)=>{setDarkMode(event.target.value)}} className='fixed top-2 rounded dark:text-zinc-300 dark:bg-zinc-700 bg-indigo-300 text-zinc-900 right-2 p-2 outline-none cursor-pointer'>
        <option  value="dark">Dark</option>
        <option  value="light">Light</option>
      </select>
      <div className='dark:bg-zinc-800 bg-indigo-200 p-4 pt-4  hidden sm:block sm:col-span-1 h-screen'>
        <RecentSearch  recentHtry={recentHtry} setRecenthtry={setRecenthtry} setSelectedhtry={setSelectedhtry}/>
      </div>
    
    
    <div  className='col-span-5 sm:col-span-4 p-5'>
    <div className='' >
        <button onClick={()=>setIsOpen(!isOpen)} className="sm:hidden left-2 top-2 fixed">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z"/></svg>
        </button>
        {
          isOpen && (
            <div className="dark:bg-zinc-800 bg-indigo-200 p-4 pt-4">
            <RecentSearch  recentHtry={recentHtry} setRecenthtry={setRecenthtry} setSelectedhtry={setSelectedhtry}/>
            </div>
          )
        }       
      </div>
    
      <h1 className='pt-6 sm:pt-2 text-2xl sm:text-4xl pb-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-500'>Hello! Ask Me Anything...</h1>
      {
        loading?
        <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
        </div>:null
      }
    
      <div ref={scrollToAns} className='container h-110 overflow-y-scroll '>
        <div className='dark:text-zinc-300 text-zinc-900'>
          <ul>
            {
              result.map((item,index)=>(
                <QuesAnsBody key={index} item={item} index={index}/>
              ))
            }
          </ul>
        </div>
      </div>
      <div className='dark:bg-zinc-800 bg-indigo-200 w-full sm:w-1/3 dark:text-white text-zinc-800 m-auto rounded-4xl p-1 pr-3 border border-zinc-400 flex h-12'>
        <input type="text" value={question}
        onKeyDown={isEnter}
        onChange={(event)=>setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' placeholder='Tell me what you want'/>
        <button onClick={askQuestion}>Tell</button>
      </div>
    </div >
   </div>
   </div>
  )
}

export default App
