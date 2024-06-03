import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  createUser():boolean{
    const userNameElement = document.getElementById('user') as HTMLInputElement;
    if(!isFilled(userNameElement))return false;
    const userName = userNameElement.value;

    const nameElement = document.getElementById('name') as HTMLInputElement;
    if(!isFilled(nameElement))return false;
    const name = nameElement.value;

    const surnameElement = document.getElementById('surname') as HTMLInputElement;
    if(!isFilled(surnameElement))return false;
    const surname = surnameElement.value;


    const emailElement = document.getElementById('email') as HTMLInputElement;
    const email = emailElement.value;
    if(!isValidEmail(email))return false;


    const intolerancesElement = document.getElementById('intolerances') as HTMLSelectElement;
    if(!isValidSelection(intolerancesElement)) return false;
    // TODO array const intolerances = intolerancesElement.value;


    const paswordElement = document.getElementById('pass') as HTMLInputElement
    const password = paswordElement.value;
    if(!isValidPassword(password)) return false;



    return true;

    // TODO cancel CREATE user + alert('Already exist a user with this email');
  }
}

function isFilled(field:HTMLInputElement):boolean{
  const value = field.value;

  if(value == null || value == undefined || value.length==0 || value.trim().length==0){
    alert('The field \"'+field.name+'\" is empty');
    return false;
  }
  return true;
}

function isValidEmail(email:string):boolean{
  const emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  if(!emailPattern.test(email)){
    alert('Use a valid email');
    return false;
  }
  return true;
}

function isValidPassword(password:string):boolean{
  //Password with uppercase, lowercase, numeric, and special characters. Without white spaces (length 8-15 characters)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/i;
  if(!passwordPattern.test(password)){
    alert('The password must 8-15 hcracters and contains at least one:\n - Uppercase letter\n - Lowercase letter\n - Number \n - Special character ($@$!%*?&)\n - No spaces');
    return false;
  }
  return true;
}

function isValidSelection(intolerancesElement : HTMLSelectElement):boolean{
  if (intolerancesElement.selectedOptions==null|| intolerancesElement.selectedOptions.length==0){
    alert('You must select one intolerance');
    return false;
  }
  return true;
}


