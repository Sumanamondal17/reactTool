function RecentSearch({recentHtry,setRecenthtry,setSelectedhtry}){

    const clearhtry=()=>{
        localStorage.clear();
        setRecenthtry([]);
      }
    
    const clearSelectedHistory=(selectedItem)=>{
      let history=JSON.parse(localStorage.getItem('history'))
      history=history.filter((item)=>{
        if(item!=selectedItem){
          return item 
        }
      })
      setRecenthtry(history)
      localStorage.setItem('history',JSON.stringify(history))
    }
   

    return (
        <>
    <div className=' '>
      
      <h1 className='text-lg dark:text-white dark:bg-zinc-700 rounded bg-indigo-300 text-zinc-900 flex justify-center p-1'>
        <span >Recent Search</span>
        <button onClick={clearhtry} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
      </h1>
      <ul className='text-left overflow-auto mt-4'>
        {
          recentHtry && recentHtry.map((item,index)=>(
            <div className="flex justify-between  py-1">
            <li key={index} onClick={()=>setSelectedhtry(item)} className='w-full pl-3 px-2 p-1 truncate dark:text-zinc-300 text-zinc-800 cursor-pointer dark:hover:bg-zinc-500 hover:bg-indigo-100 bg-indigo-300 dark:hover:text-zinc-200 hover:text-zinc-900 rounded dark:bg-zinc-700'>{item}</li>
            <button onClick={()=>clearSelectedHistory(item)} className='cursor-pointer dark:hover:bg-zinc-950 hover:bg-indigo-100 rounded'><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
            </div>
          ))
        }
      </ul>
    </div>
    
        </>
    )
}

export default RecentSearch