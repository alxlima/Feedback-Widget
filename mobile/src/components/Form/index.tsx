import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native'; // biblioteca de icones mobile react.native
import { captureScreen} from 'react-native-view-shot'; //biblioteca de captura imagens no mobile
import * as FileSystem from 'expo-file-system'; //biblitoteca de conversão de arquivos de envio no dispositvos mobile
   
import { FeedbackType } from '../../components/Widget';
import { Button } from '../../components/Button';
import { ScreenshotButton } from '../../components/ScreenshotButton';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api'; // biblioteca para requisições Http - com back-end


interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent  }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  //função que controlo estado da captura de imagens (criar imagen)
  function handleScreenshot(){
    captureScreen ({
      format:'jpg',
      quality: 0.8
    })
    .then(uri => setScreenshot(uri)) //[uri]- caminho imagen esta temporaria no dispositivo mobile
    .catch(error => console.log(error));
  }

  //função que controlo estado da remoção de imagens (retirar imagen)
  function handleScreenshotRemove(){
     setScreenshot(null);
  }

  //função que faço a requisição para nosso back-End
  async function handleSendFeedback(){
    //valido efeito de loadin do botão enviar feedback
    if(isSendingFeedback){
      return;
    }

    setIsSendingFeedback(true);
    //trato conversão do arquivos imagens salvas no dispositivo mobile
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding:'base64'});

    //trato a Requisição do minha API sobre envio de respostas ao back-end que esta aguardando.
    try{
      await api.post('/feedbacks',{
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment
      });
      onFeedbackSent(); // informoque informação foi enviada

    }catch(error){
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

          <TouchableOpacity onPress={onFeedbackCanceled}>
              <ArrowLeft 
                size={24}
                weight="bold"
                color={theme.colors.text_secondary}        
              />
          </TouchableOpacity >
        <View style={styles.titleContainer}>
            <Image 
              source={feedbackTypeInfo.image}
              style={styles.image}
            />
            <Text style={styles.titleText}>
                {feedbackTypeInfo.title}
            </Text>

        </View>
      </View>
      
      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary }
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
         <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot} //"https://github.com/alxlima.png"
         />

       <Button 
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback} 
       />

      </View>

    </View>

  
  );
}