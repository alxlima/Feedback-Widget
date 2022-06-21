import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = função espiões
const createFeedbackSpy = jest.fn(); //jest.fn(função espião)
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
    //{ create: async () => {} },
   // { sendMail: async () => {} }
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy }
    )

//teste unitários quando enviar parametro inconsistente no campo.
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
     
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot:'data:image/png;base64,teste',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
     
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot:'data:image/png;base64,teste',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without Comment', async () => {
     
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot:'data:image/png;base64,teste',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
     
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'ta tudo bugado',
            screenshot:'test.jpg',
        })).rejects.toThrow();
    });

});