export interface Todo {
  id: number;
  title: string;
  body: string;
  // due:date;
  
  isCompleted: boolean;
}

export interface CreateFormPayload {
  title: string;
  body: string;
  // due: string;
}
