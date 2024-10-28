export type FlashcardProp = {
    _id: string;
    front_title: string;
    front_text?: string;
    back_title?: string;
    back_text?: string;
    createdAt?: string;
    updatedAt?: string;
    stack: string;
    learnStatus: "unsorted" | "dontKnow" | "notSure" | "know";
    lastReviewed: Date;
    nextReviewDate: Date;
    reviewInterval: number;
    easinessFactor: number;
    repetitionCount: number;
};
