export class Release {
  id!: string;
  name!: string;
  details!: string;
  deploymentPlanId!: string;
  archived?:boolean = false;

}
