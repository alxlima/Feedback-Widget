import React,{ useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


import { Options } from '../Options';
import { Success } from '../Success';
import { Form } from '../Form';


import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setfeedbackSent] = useState(false);


  const bottomSheetRef = useRef<BottomSheet>(null);

  function handlerOpen(){
      bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback(){
    setFeedbackType(null);
    setfeedbackSent(false);
  }

  function handleFeedbackSent(){
    setfeedbackSent(true);
  }

  return (
   // <View style={styles.container}>
   // </View>
   <>
     <TouchableOpacity 
       style= {styles.button}
       onPress= {handlerOpen}
       >
       <ChatTeardropDots
         size = {24}
         weight="bold"
         color = {theme.colors.text_on_brand_color}
       />
     </TouchableOpacity>

     <BottomSheet
         ref ={bottomSheetRef}
         snapPoints ={[1, 280]}
         backgroundStyle={styles.modal}
         handleIndicatorStyle={styles.indicator}
     >
        {
          feedbackSent ?
          <Success onSendAnotherFeedback={handleRestartFeedback}/>
          :
          <>{
              feedbackType ?
               <Form 
                 feedbackType ={feedbackType}
                 onFeedbackCanceled={handleRestartFeedback}
                 onFeedbackSent={handleFeedbackSent} 
                />
                :
                <Options onFeedbackTypeChanged={setFeedbackType}/>
            } 
          </>
        }
     </BottomSheet>
   </>
  );
}

export default gestureHandlerRootHOC(Widget);