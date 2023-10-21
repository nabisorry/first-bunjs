export type TodosResponse = TodoResponse[];

export interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
