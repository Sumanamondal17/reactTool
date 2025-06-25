import { useEffect,useState } from "react"
import { checkHeading, removeStar } from "../checkHeading"

const Answer=({ans,index,totalResult,type})=>{
    const [heading,setHeading]=useState(false)
    const[answer,setAnswer]=useState(ans)

     useEffect(()=>{
        if(checkHeading(ans)){
            setHeading(true)
            setAnswer(removeStar(ans))
        }
     },[])
    
   

    return(
        <div>
           {index==0 && totalResult >1?<span className=" text-3xl block dark:text-white text-zinc-800">{answer}</span>
           :heading? <span className="pt-2 text-lg font-semibold block dark:text-white text-zinc-800">{answer}</span>
            :<span className={type=='q'?'pl-1':' pl-2 '}>
                {answer}</span>}
            
            </div>
    )
}
export default Answer