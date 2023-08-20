const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
var users = [{ name: "Mohammed", phoneNumber: '0629615298' },
{ name: "Abdullah", phoneNumber: '0628202018' },
{ name: "Zakaria", phoneNumber: '0628760199' }
];
function addUser() {
  rl.question('What is your name? ', (answer1) => {

    rl.question('What is your phone number? ', (answer2) => {
      newUser = { name: answer1, phoneNumber: answer2 };
      users.push(newUser);
      console.log('Contact added succecfuly!');
      Main()
    })
  })
}
function view() {
  console.log('---This a list of all contacts---')
 for (i = 0; i < users.length; i++) {
   console.log(`Name : ${users[i].name}; Phone Number: ${users[i].phoneNumber}`)
};
Main()
}
function search() {
  rl.question('Enter a name: ', (answer) => {
    for (i = 0; i < users.length; i++) {
      if(users[i].name.toLowerCase()==answer.toLowerCase()){
        console.log(`The phone number of ${users[i].name} is ${users[i].phoneNumber}`);
      }
    }
    Main()
  })
}
function Main(){
  rl.question('Enter a command (add/search/viewall/exit): ',(answer=>{
    if (answer.toLowerCase()=='add'){addUser();}
    else if (answer.toLowerCase()=='search'){search();}
    else if (answer.toLowerCase()=='viewall'){view();}
    else if (answer.toLowerCase()=='exit'){rl.close();}
    else {console.log('Command not Found, please try again!!');}
  } 
  ))
}
  rl.on('close',()=>{
console.log('Goodbye!!')
  })
Main();
