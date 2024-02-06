placeholderOn();

let letrasSemCriptografia = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'};



function placeholderOn() {
    document.getElementById('output__com__texto').style.display = 'none';
    document.getElementById('output__sem__texto').style.display = 'flex';
}

function placeholderOff() {
    document.getElementById('output__com__texto').style.display = 'flex';
    document.getElementById('output__sem__texto').style.display = 'none';
}

function validarInput(texto) {
    var regex = /^[a-z ]+$/;

    return regex.test(texto);
}

function criptografia() {
    limparCampo();
    var texto = document.getElementById('input__texto').value;

    if (!validarInput(texto)) {
        console.log("O texto deve conter apenas letras minúsculas e espaços.");
        return;
    }

    var textoCriptografado = '';

    for (var i = 0; i < texto.length; i++){
        var letra = texto[i];
        
        if (letrasSemCriptografia.hasOwnProperty(letra)){
            textoCriptografado += letrasSemCriptografia[letra];
        } else {
            textoCriptografado += texto[i];
        }
    }
    placeholderOff();
    document.getElementById('output__texto').value = textoCriptografado; 
}

function descriptografia() {
    limparCampo();
    var textoCriptografado = document.getElementById('input__texto').value;

    if (!validarInput(textoCriptografado)) {
        console.log("O texto criptografado deve conter apenas letras minúsculas e espaços.");
        return;
    }


    var textoDescriptografado = '';

    for (var i = 0; i < textoCriptografado.length;) {
        var substrEncontrado = false;

        for (var letra in letrasSemCriptografia) {
            var substringCripto = letrasSemCriptografia[letra];

            if (textoCriptografado.startsWith(substringCripto, i)) {
                textoDescriptografado += letra;
                i += substringCripto.length;
                substrEncontrado = true;
                break;
            }
        }

        if (!substrEncontrado) {
            textoDescriptografado += textoCriptografado[i];
            i++;
        }
    }
    placeholderOff();
    document.getElementById('output__texto').value = textoDescriptografado;;
}

document.getElementById('botao__copiar').addEventListener('click', function() {
    var elementoDeSaida = document.getElementById('output__texto');
    var textoParaCopiar = elementoDeSaida.value;

    navigator.clipboard.writeText(textoParaCopiar)
        .then(function() {
            console.log('Texto copiado para a área de transferência!');
        })
        .catch(function(err) {
            console.error('Erro ao copiar o texto:', err);
        });
});

function limparCampo() {
    resultado = document.getElementById('output__texto');
    resultado.value = '';
}