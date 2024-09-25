export class PlanPackageDetails {
  plan_Base_Price: number = 0;
  plan_Extra_Adult_Price: number = 1200;
  plan_Adult_Price_Percentage: number = 10;
  plan_Child_Age_To_Price_Range: any[] = [
    {
      isAmout: true,
      amount: 0,
      percentage: 5,
      counts_as_base_occupant: "never",
      exclude_from_capacity: true,
      max_age: 5,
    },
    {
      isAmout: true,
      amount: 500,
      percentage: 5,
      counts_as_base_occupant: "never",
      exclude_from_capacity: true,
      max_age: 14,
    },
    {
      isAmout: true,
      amount: 850,
      percentage: 5,
      counts_as_base_occupant: "never",
      exclude_from_capacity: true,
      max_age: 17,
    },
  ];
  plan_Promotion_Price: number = 0;
  plan_Promotion_Id: string = "";
  plan_Date: Date = new Date();

  plan_Child_Price: number = 0;

  constructor(
    plan_Base_Price: number = 0.0,
    plan_Child_Price: number = 0.0,
    plan_Promotion_Price: number = 0.0
  ) {
    this.plan_Base_Price = plan_Base_Price;
    this.plan_Child_Price = plan_Child_Price;
    this.plan_Promotion_Price = plan_Promotion_Price;
  }
}
