$(document).ready(function() {

// Om encrypt-knappen trycks på
  $('.button').on('click', function() {

// Kolla om knappen har viss klass
    if ($(this).hasClass('encrypt-button')) {
      let userInput = $('#user-message').val();
      let userKey = $('.user-key').val();
      let encryption = encrypt(userInput, userKey, alphabet);
      let userOutput = "";

      for (var i = 0; i < encryption.length; i++) {

        if (i % 4 === 0) {
          userOutput += "\n";
        }
        userOutput += encryption[i] + " ";
      }

      userOutput = userOutput.toUpperCase().trim();

      return slider(userOutput);

//Kolla om knappen har en annan klass
    } else if ($(this).hasClass('decrypt-button')) {
        let userInput = $('#user-message').val();
        let userKey = $('.user-key').val();
        let decryption = decrypt(userInput, userKey, alphabet);
        let userOutput = "";

        for (var i = 0; i < decryption.length; i++) {

          if (i % 4 === 0) {
            userOutput += "\n";
          }
          userOutput += decryption[i] + " ";
        }

        userOutput = userOutput.toUpperCase().trim()

        return slider(userOutput);
      }
    });
  });


// HÄR ÄR MODALEN


    // lägger till aktiv class vid klick

    $('.click-here').on('click', function() {
        $('.modal-overlay').addClass('modal-overlay-active modal-overlay-active-transition');
        $('.modal').addClass('modal-active modal-active-transition');
    });

    // tar bort klass vid klick

    $('.modal-close-btn').on('click', function() {
        $('.modal-overlay').removeClass('modal-overlay-active-transition');
        $('.modal').removeClass('modal-active-transition');


        setTimeout(function() {
            $('.modal-overlay').removeClass('modal-overlay-active');
            $('.modal').removeClass('modal-active');
        }, 500 )
    });


// HÄR BYGGS KRYPTOKARTAN

const alphabet = 'abcdefghijklmnopqrstuvwxyzåäö';
//const ALPHABET_LENGTH = ALPHABET.length;

    let userPlainText = 'hejhej';
    let userCipherText = "";
    let key = 'nycket';


    let getCipherDisc = function () {
	   let cipherDisc = {},
        letter,
        firstPart,
        lastPart;


    for (let i = 0; i < alphabet.length; i++) {
        letter = alphabet[i];
        firstPart = alphabet.slice(0, i);
        lastPart = alphabet.slice(i, alphabet.length);
        cipherDisc[letter] = lastPart + firstPart;
    };

  return cipherDisc;
}


// HÄR ÄR KRYPTERINGSFUNKTIONEN

let encrypt = function(string, key, alphabet) {
    string = string.toLowerCase().trim();
    string = string.replace(/\s/g, '');
    key = key.toLowerCase().trim();
    key = key.replace(/\s/g, '');

    let cipherText = '';
    let cipherDisc = getCipherDisc();
    let repeatedKey = key.repeat(string.length);
    repeatedKey = repeatedKey.slice(0, string.length);

    for ( let i = 0; i < repeatedKey.length; i++) {
        let repeatedKeyLetter = repeatedKey[i];
        let cipherDiscAlphabet = cipherDisc[repeatedKeyLetter];
        let letter = string[i];
        let index = alphabet.indexOf(letter);
        let encryptionLetter = cipherDiscAlphabet[index];
        cipherText += encryptionLetter;
    }
    return cipherText;
}



// HÄR KOMMER DEKRYPTERINGSFUNKTIONEN

let decrypt = function(string, key, alphabet) {
	string = string.toLowerCase().trim();
    string = string.replace(/\s/g, '');
    key = key.toLowerCase().trim();
    key = key.replace(/\s/g, '');

    let plainText = '';
    let cipherDisc = getCipherDisc();
    let repeatedKey = key.repeat(string.length);
    repeatedKey = repeatedKey.slice(0, string.length);

    for ( let i = 0; i < repeatedKey.length; i++) {
        let repeatedKeyLetter = repeatedKey[i];
        let cipherDiscAlphabet = cipherDisc[repeatedKeyLetter];
        let letter = string[i];
        let index = cipherDiscAlphabet.indexOf(letter);
        let decryptionLetter = alphabet[index];
        plainText += decryptionLetter;
  }

  return plainText;
}


// HÄR FINNS SLIDERFUNKTIONEN

let slider = function(output) {

    let outputArea = $('.output-area');

    if (outputArea.hasClass('output-area-active') == false) {
        outputArea.addClass('output-area-active').
        text(output).slideDown(600);
        $('.output-area-active').css('display', 'flex').
        css('justify-content', 'center');
    } else {
        outputArea.slideUp(400, function() {
            outputArea.text(output).delay(600).
            slideDown(600);
        });
    }
};




/*

// Denna funktionen gör mellanslag och radbrytningar
let userOutput = "";

for (var i = 0; i < encryption.length; i++) {
	if (i % 4 === 0) {
  	userOutput += "\n";
  }
  userOutput += encryption[i] + " ";
}

/* console.log(userOutput.toUpperCase().trim()); */ // bara utkommenterat så jag inte glömmer bort det



// encrypt($('#userInput'.val()), $('.userKey'.val()), alphabet)

/* det funkar så här också

let userOutput = "";

for (var i = 0; i < encryption.length; i++) {
	if (i <= (encryption.length - 1)) {
  	if (i % 4 === 0) {
  		userOutput += "\n";
  	}
    userOutput += encryption[i] + " ";
  }
  else {
  	userOutput += encryption[i];
  }
}

console.log(userOutput.toUpperCase()); */


// skapa en sida med två fält där användaren kan skriva sin plaintext och sitt lösenord
// utöka programmet: if *key innehåller siffror* *prompt a new key* och be användaren
// skriva lösenord utan siffror (ge förslag på att siffror kan skrivas med bokstäver, typ 'noll') */
