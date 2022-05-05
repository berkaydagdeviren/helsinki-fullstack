


// function that returns a random integer to decide one of 3 options    //

function random() {
  let randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
    return 'SOL';
  } else if (randomNumber === 1) {
    return 'SAĞ';
  } else {
    return 'ORTA';
  }
  
}

for (let i = 0; i < 10; i++) {
  console.log(random());
}
   