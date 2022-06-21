import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";


// implementando metodos de contratos - conceitos do SOLID - onde estou desaclopando abstraindo base de dados desta aplicação.
export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create({type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({ //[aync-wait] - aguarda db resp, para depois enviar para o front-end
            data: {
              type,
              comment,
              screenshot,
             }  
          });
    }       
}