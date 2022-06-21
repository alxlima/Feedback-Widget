export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

// exporto operação que são realizadas no banco de dados, porem não seram implementadas
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}
