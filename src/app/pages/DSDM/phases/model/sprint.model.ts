import { Iteration } from "./iteration.model";

export class Sprint {
  id!: string;
  name!: string;
  projectId!: string;
  showIterationForm?: boolean;
  archived?:boolean = false;

  iterations!: Iteration[];
}
