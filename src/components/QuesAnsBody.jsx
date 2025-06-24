import Answer from './Answers'


function QuesAnsBody({item,index}){
    return(
        <>
        <div key={index+Math.random()} className={item.type=='q'?'flex justify-end':''}>
                  { 
                    item.type=='q'?
                    <li key={index+Math.random()} 
                    className='text-right p-2 dark:border-zinc-700 border-indigo-200 border-4 dark:bg-zinc-700 bg-indigo-200 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit m-2' 
                    ><Answer ans={item.text} 
                    totalResult={1} 
                    index={index}
                    type={item.type}/>
                    </li>
                    :item.text.map((ansItem,ansIndex)=>
                    (<li key={ansIndex+Math.random()} className='text-left p-2'><Answer ans={ansItem} totalResult={item.length} type={item.type} index={ansIndex}/></li>
                    ))

                  }
        </div>
        </>
    )
}
export default QuesAnsBody