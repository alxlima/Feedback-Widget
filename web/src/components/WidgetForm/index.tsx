import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


//array onde guardo feedback - Object.entries(feedbackTypes)=> [ ['BUG'{...}],[IDEA] {...},[OTHER {...}]]
export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image:{
      source:bugImageUrl,
      alt:'Imagem de um inseto'
    }
  },
  IDEA:{
    title: 'Ideia',
    image:{
        source:ideaImageUrl,
        alt:'Imagem de uma lampada'
      }
  },
  OTHER:{
    title: 'Outro',
    image:{
        source:thoughtImageUrl,
        alt:'Imagem de um balão de pensamento'
      }
  }
}

// obtenho a chaves do array de feedback
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
   // obtenho um resultado de estado para tipo type do feedback selecionado.
   const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
   const [feedbackSent, setfeedbackSent] = useState(false);
    
   // retorno para form de wedgat inicial para seleção do feedback.
   function handleRestartFeedback(){
     setfeedbackSent(false);
     setFeedbackType(null);
   }
    

    return (
      <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ">
       { feedbackSent ? (
         <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} />
       ):(
         <>
           {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          
            ) : (
              <FeedbackContentStep 
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onfeedbackSent= {()=> setfeedbackSent(true)}
              />
            )}
         </>
       )}
      
         
         <footer className="text-xs text-neutral-400">
           Feito com ♥ por <a className="underline underline-offset-1" href="https://github.com/alxlima">Alex Lima</a>
         </footer>

        </div>
    )
}