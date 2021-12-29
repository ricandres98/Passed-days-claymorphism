var initialDate = document.getElementById('initial-date');
var finalDate = document.getElementById('final-date');

document.addEventListener("mouseover", color);
document.addEventListener("keydown", color);

function color(){
    console.log("hola");
    if (initialDate.value != '') {
        initialDate.style.color = "#021414";
        initialDate.style.fontWeight = "800";
    }
    else {
        initialDate.style.color = "gray";
        initialDate.style.fontWeight = "normal";
    }

    if (finalDate.value != '') {
        finalDate.style.color = "#021414";
        finalDate.style.fontWeight = "800";
    }
    else {
        finalDate.style.color = "gray";
        finalDate.style.fontWeight = "normal";
    }
}