
$(document).ready(function () {//funcion de jQuery que ejecuta el codigo una vez que se cargue el DOM
  // Función para validar el formulario
  function validarFormulario(event) {
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var edad = parseInt($("#edad").val());
    var correo = $("#correo").val();
    var ciudad = $("#ciudad").val();
    var usuario = $("#usuario").val();
    var contraseña = $("#contrasena").val();

    if (
      nombre === "" ||
      apellido === "" ||
      isNaN(edad) ||
      edad < 18 ||
      edad > 100 ||
      correo === "" ||
      ciudad === "" ||
      usuario === "" ||
      contraseña === ""
    ) {
      event.preventDefault();// Evitar el envío del formulario por defecto
      alert("Todos los campos son requeridos o no se cumplen las condiciones.");
    } else {
      // Redirigir a otra página si se cumplen las condiciones
      window.location.href = "adivinanzas.html";
    }
  }

  // Asignar la función de validación al evento submit del formulario
  $("#my-form").submit(function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    validarFormulario(event); // Llamar a la función de validación antes de enviar el formulario


  });



  //cargar las provincias
  $.ajax({
    url: "https://apis.datos.gob.ar/georef/api/provincias",
    method: "GET",
    dataType: "json",
    success: function (response) {
      var select = $("#my-select");

      // Obtener la longitud del arreglo de provincias
      var length = response.provincias.length;

      // Recorrer el arreglo de provincias y crear las opciones del select
      for (var i = 0; i < length; i++) {
        // Se utiliza un bucle for para recorrer cada índice del arreglo de provincias
        var provincia = response.provincias[i];
        // Se almacena el objeto de la provincia actual en la variable 'provincia'

        var option = $("<option>").text(provincia.nombre).val(provincia.id);
        // Se crea un elemento <option> utilizando jQuery, estableciendo el texto de la opción como el nombre de la provincia y el valor de la opción como el id de la provincia

        select.append(option);
        // Se agrega el elemento <option> al elemento <select> existente en el documento HTML

      }
    },
    error: function (xhr, status, error) {
      // Manejo del error si no encuentra la peticion
      console.log("Error en la solicitud AJAX: " + error);
    }
  });




  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    method: "GET",
    dataType: "json",
    success: function (response) {
      var select = $("#my-select1");

      // Obtener la longitud del arreglo de países
      var length = response.length;

      // Recorrer el arreglo de países y crear las opciones del select
      for (var i = 0; i < length; i++) {
        var country = response[i];
        var option = $("<option>").text(country.name.common).val(country.name.common);
        select.append(option);
      }
    },
    error: function (xhr, status, error) {
      // Manejo del error si no encuentra la peticion
      console.log("Error en la solicitud AJAX: " + error);
    }
  });




  //condiciones del juego adivinanza
  $("#juego-adivinanzas").submit(function (event) {
    event.preventDefault();
    // Evita que el formulario se envíe y la página se recargue
    var respuestas = {
      adivinanza1: "reloj",
      adivinanza2: "pera",
      adivinanza3: "sandia",
    };
    // Define un objeto con las respuestas correctas para cada adivinanza

    var puntuacion = 0;
    // Inicializa la puntuación del jugador en 0

    var respuestasUsuario = {
      adivinanza1: $("#adivinanza1").val().toLowerCase(),//crea un objeto respuestasUsuario que almacena las respuestas del usuario a las adivinanzas. Cada respuesta se obtiene del valor
      adivinanza2: $("#adivinanza2").val().toLowerCase(),
      adivinanza3: $("#adivinanza3").val().toLowerCase()
    };



    Object.keys(respuestas).forEach(function (adivinanza) {
      if (respuestasUsuario[adivinanza] === respuestas[adivinanza]) {
        puntuacion++;
        $("#" + adivinanza).removeClass("incorrecta").addClass("correcta");
      } else {
        $("#" + adivinanza).removeClass("correcta").addClass("incorrecta");
      }
    });
    // Compara las respuestas del usuario con las respuestas correctas y actualiza la puntuación y las clases CSS de las adivinanzas


    var resultadoText = "";

    if (puntuacion === Object.keys(respuestas).length) {
      resultadoText = "¡Felicitaciones! Has acertado todas las respuestas correctamente.";
    } else {
      resultadoText = "Tienes " + puntuacion + " respuestas correctas de " + Object.keys(respuestas).length + ". Sigue practicando.";
    }
    // Compara las respuestas del usuario con las respuestas correctas y actualiza la puntuación y las clases CSS de las adivinanzas


    $("#resultado").text(resultadoText);
    // Actualiza el elemento con el id "resultado" para mostrar el mensaje de resultado

  });

  $("#reiniciar").click(function () {
    $("#resultado").empty();
    $("#juego-adivinanzas")[0].reset();
    $("input").removeClass("correcta incorrecta");
  });
  // Establece un evento de clic en el elemento con el id "reiniciar" para reiniciar el juego: vacía el elemento "resultado", restablece los campos del formulario y elimina las clases CSS "correcta" e "incorrecta" de los elementos de entrada










  //Juego de preguntas y respuestas
  var questions = [
    {
      question: "¿Cuál es la capital de Francia?",
      options: ["París", "Roma", "Londres", "Madrid"],
      answer: "París"
    },
    {
      question: "¿Cuál es el río más largo del mundo?",
      options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
      answer: "Amazonas"
    },
    {
      question: "¿Cuál es el animal terrestre más grande?",
      options: ["Elefante africano", "Jirafa", "Rinoceronte blanco", "Hipopótamo"],
      answer: "Elefante africano"
    },
    {
      question: "¿Cuál es el metal más ligero?",
      options: ["Aluminio", "Cobre", "Plata", "Litio"],
      answer: "Litio"
    },
    {
      question: "¿Cuál es el país más poblado del mundo?",
      options: ["China", "India", "Estados Unidos", "Brasil"],
      answer: "China"
    },
    {
      question: "¿Cuál es el lugar más frío de la tierra?",
      options: ["Japon", "China", "Tailandia", "La Antartida"],
      answer: "La Antartida"
    },
    {
      question: "¿Cuándo acabó la II Guerra Mundial?",
      options: ["1970", "1950", "1955", "1945"],
      answer: "1945"
    }
  ];
  
  $("#boton").click(function () {
    // Código que se ejecuta cuando se hace clic en el botón "submit-btn"
  });
  
  var currentQuestion = 0;
  var score = 0;
  
  function displayQuestion() {
    var question = questions[currentQuestion];
    $("#question").text(question.question);
  
    var optionsHtml = "";
    for (var i = 0; i < question.options.length; i++) {
      optionsHtml += "<li>" + question.options[i] + "</li>";
    }
    $("#options").html(optionsHtml);
  }
  
  function checkAnswer(selectedAnswer) {
    var question = questions[currentQuestion];
    if (selectedAnswer === question.answer) {
      score++;
      $("#result").text("¡Respuesta correcta!");
    } else {
      $("#result").text("Respuesta incorrecta. La respuesta correcta es: " + question.answer);
    }
    $("#score").text("Puntuación: " + score);
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      $("#question-container").hide();
      $("#result-container").text("¡Has terminado el juego! Puntuación final: " + score);
    }
  }
  
  $("#options").on("click", "li", function () {
    var selectedAnswer = $(this).text();
    checkAnswer(selectedAnswer);
    nextQuestion();
  });
  
  displayQuestion();
  
  function reiniciarJuego() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    $("#reiniciar-btn").hide();
  }
  
  $("#reiniciar-btn").click(function () {
    reiniciarJuego();
  });
});  