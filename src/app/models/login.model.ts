export class Login {

 completed: string[];
 loading: boolean = false;
 success: boolean = false;

}

export class PetTag {
  constructor(
    public title: string,
    public time_ago: string,
  ) { }
}
