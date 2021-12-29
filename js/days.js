function year(year, bisiesto) {
    this.number = year;
    this.bisiesto = bisiesto;
}
function month(nombre, numero, dias) {
    this.nombre =nombre;
    this.numero = numero;
    this.dias = dias;
}
function date (day, month, year){
    this.day = day;
    this.month = month;
    this.year = year;
}

var initialDate = document.getElementById('initial-date');
var finalDate = document.getElementById('final-date');

var button = document.getElementById("button");
button.addEventListener('click', main);

var result = document.getElementById('result');

var fechaDeNacimiento = new date();
var fechaActual = new date();

//Array que contiene información para cada mes del año
var meses = [];
meses.push(new month("enero", 1, 31));
meses.push(new month("febrero", 2, 28));
meses.push(new month("marzo", 3, 31));
meses.push(new month("abril", 4, 30));
meses.push(new month("mayo", 5, 31));
meses.push(new month("junio", 6, 30));
meses.push(new month("julio", 7, 31));
meses.push(new month("agosto", 8, 31));
meses.push(new month("septiembre", 9, 30));
meses.push(new month("octubre", 10, 31));
meses.push(new month("noviembre", 11, 30));
meses.push(new month("diciembre", 12, 31));

// Variable circustancial utilizada para verificar si el año inicial es bisiesto
var initialYear = new year();

function verificaBisiesto(year) {
    //Se convierte el string a tipo number
    Number(year.number)
    // Un año es bisiesto si es divisible entre 4,
    // a excepción de los que son divisibles entre 100 que no son bisiestos
    // excepto por los que son divisibles entre 400 que si son bisiestos 
    if (year.number % 4 === 0) {
        if (year.number % 100 == 0) {
            if (year.number % 400 == 0) {
                year.bisiesto = true;
            }
            else {
                year.bisiesto = false;
            }
        }
        else {
            year.bisiesto = true;
        }
    }
    else {
        year.bisiesto = false;
    }
}

//Función que indica en qué # de día del año estamos
function dayOfTheYear(fecha) {
    fecha.day = Number(fecha.day);
    fecha.month = Number(fecha.month);
    // Si la fecha es del mes de enero simplemente imprime el dia de la fecha
    if (fecha.month > 1) {
        let dias = 0;
        // Acumulador de los días de los meses completos previos a la fecha
        for (let i = 0; i < (fecha.month - 1); i++){
            dias += meses[i].dias; 
        }
        // Si la fecha es posterior a febrero y el año es bisiesto, agrega un día
        if (fecha.month > 2 && initialYear.bisiesto == true){
            dias += 1;
        }
        // Suma al acumulador el dia de la fecha
        dias += fecha.day;
        return dias;
    }
    else {
        return fecha.day;
    }
}

// Función que indica cuántos días faltan para año nuevo
function daysToNewYear(year, currentDay) {
    // Si el año es bisiesto el total de días es 366, sino es 365
    if(year.bisiesto == true) {
        var daysInAYear = 366;
    }
    else {
        var daysInAYear = 365;
    }
    return daysInAYear - currentDay;
}

// Función que convierte a tipo Numer los valores de las propiedades dentro de un objeto tipo date
function dateToNumber(date) {
    date.day = Number(date.day);
    date.month = Number(date.month);
    date.year = Number(date.year);    
}

function main() {
    // La fecha proprcionada por los input tipo date es un solo string que contiene
    // el día, mes y año en el formato yyyy-mm-dd, por lo que hay que cortarlo en 
    // distintos strings para obtener estos valores
    
    //Fecha inicial
    fechaDeNacimiento.year = initialDate.value.slice(0, 4);
    fechaDeNacimiento.month = initialDate.value.slice(5, 7);
    fechaDeNacimiento.day = initialDate.value.slice(8, 10);
    //Fecha Final
    fechaActual.year = finalDate.value.slice(0, 4);
    fechaActual.month = finalDate.value.slice(5, 7);
    fechaActual.day = finalDate.value.slice(8, 10);
    dateToNumber(fechaDeNacimiento);
    dateToNumber(fechaActual);

    
    //Verificación para evitar errores con fechas iniciales mayores que fechas finales
    if (fechaDeNacimiento.year > fechaActual.year ||
        (fechaDeNacimiento.year == fechaActual.year && fechaDeNacimiento.month > fechaActual.month) ||
        (fechaDeNacimiento.year == fechaActual.year && fechaDeNacimiento.month == fechaActual.month && fechaDeNacimiento.day > fechaActual.day)) {
        console.log("ERROR. La fecha de nacimiento debe ser menor que la actual");
    }
    else {
        if(fechaDeNacimiento.year == fechaActual.year){
            if(fechaDeNacimiento.month == fechaActual.month) {
                var totalDays = fechaActual.day - fechaDeNacimiento.day;
            }
            else {
                // (1) Hay que calcular los días restantes del mes de nacimiento,
                // (2) los días de los meses en el medio entre ambas fechas
                // (3) y sumar ambas cantidades al día del mes de la fecha actual
                
                // (1)
                var mesDeNacimiento = meses.find(function(mes){
                        return mes.numero == fechaDeNacimiento.month;
                });
                console.log(mesDeNacimiento);
                var restantes = mesDeNacimiento.dias - fechaDeNacimiento.day;
        
                // (2)
                var monthsBetween = meses.filter(function(mes){
                        return mes.numero > fechaDeNacimiento.month && mes.numero < fechaActual.month;
                });
                console.log(monthsBetween);
                var acumDays = 0;
                for (mes of monthsBetween) {
                    acumDays += mes.dias;
                }
        
                // (3)
                var totalDays = restantes + acumDays + fechaActual.day;
            }
        }
        else {
            // (1) Hay que calcular los días restantes del año de nacimiento,
            // (2) los días de los años en el medio entre ambas fechas
            // (3) y sumar ambas cantidades al día del año de la fecha actual

            // (1)
            // Verifica si el año inicial es bisiesto
            initialYear.number = fechaDeNacimiento.year;
            verificaBisiesto(initialYear);
            //Cuenta qué día del año inicial es
            var dayNumber = dayOfTheYear(fechaDeNacimiento);
            //Cuenta días para año nuevo del año inicial
            var daysToNY = daysToNewYear(initialYear, dayNumber);
        
            // (2)
            var years = [];
        
            //Se genera un array de objetos year, excluyendo el año de nacimiento (n) y el año actual (a)
            // [n] ([] [] [] []) [a] 
            //      \    |    /
            //       \   |   /
            for(i = 1; i < (fechaActual.year - fechaDeNacimiento.year); i++) {
                years.push(new year(fechaDeNacimiento.year + i));
                verificaBisiesto(years[i-1])
            }
            //En el acumulador se suma la cantidad de días de todos estos años
            var acumDays = 0;
            for(item of years) {
                if(item.bisiesto == true){
                    acumDays += 366;
                }
                else {
                    acumDays += 365;
                }
            }
            
            //(3)
            //Con la función dayOfTheYear se calcula el dia del año en que se está
            var currentDayOfThisY = dayOfTheYear(fechaActual);
        
            //El total de días es los días que faltaban para año nuevo en el año inicial, más
            //todos los días de los años en el medio, más los días que han transcurrido del año actual
        
            var totalDays = daysToNY + acumDays + currentDayOfThisY;
        }
        
        console.log(`Han pasado ${totalDays} días desde que naciste`);
        result.innerHTML = `¡Han pasado ${totalDays} días!`;
        result.style.display = 'block';
    }
}