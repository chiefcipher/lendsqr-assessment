import {User} from './types'

export default class Users  {
public length ; 
  public users ;
    constructor(users:User[]) {
    this.users = users
    this.length = users.length 
 
  }

  paginate = (perPage:number, currentPage:number) => {
    this.users = this.users.slice(perPage * currentPage,(perPage * currentPage )+ perPage)
    return this
  }

  orgName = (name:string) =>{
    if (!name) return this ; 
    this.users = this.users.filter(user => user.orgName.toLocaleLowerCase() === name.toLowerCase());
    return this ; 
  }
  username = (username:string) =>{
    if (!username) return this ; 
    this.users = this.users.filter(user => user.userName.toLocaleLowerCase() === username.toLocaleLowerCase());
    return this ; 
  }
  email= (mail:string) =>{
    if (!mail) return this ; 
    this.users = this.users.filter(user => user.email.toLocaleLowerCase() === mail.toLocaleLowerCase());
    return this ; 
  }

  date = (date:Date)  =>{
    if (!date) return this ; 
    const yyyy = date.getFullYear()
    const mm = date.getMonth(); 
    const dd = date.getDate();
    this.users = this.users.filter(user => {
      const createAt = new Date(user.createdAt);

      return yyyy === createAt.getFullYear() && mm === createAt.getMonth() &&
      dd === createAt.getDate();  
    });
    return this ; 
  }

  phoneNumber = (tel:string) =>{
    if (!tel) return this ; 
    this.users = this.users.filter(user => user.phoneNumber === tel);
    return this ; 
  }
  

}