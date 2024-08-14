import { Release } from "./release.model";

export class DeploymentPlan {
  id!: string;
  environment!: string;
  dataMigration!: string;
  preProdTests!: string;
  projectId!: string;
  releases!: Release[];
  archived?:boolean = false;

}
