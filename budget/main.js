function calc() {
    let sum = 0;
    for (const input of this) {
        const next = input.nextElementSibling.children[0];
        input.checked && next && (sum += 1 * next.innerHTML.slice(3));
    }
    shop.innerHTML = "R$ " + sum;
    return sum;
}
function changeStatus(ref) {
    ref = document.querySelector(ref);
    if (this.checked) { 
        ref.removeAttribute("disabled");
    } else {
        const inputs = ref.getElementsByTagName("input");
        for (const input of inputs) { input.checked = false; }
        ref.setAttribute("disabled", true);
    }
}
function calcTime(sum) {
    let days = Math.ceil(sum / 300 );
    this.innerHTML = "Previsto: " + days + (days > 1 ? " dias " : " dia ") + "de trabalho";
    return days;
}
function setBody() {
    let sum = calc.call(inputs);
    let txt = `
        <div class="w3-container w3-light-gray w3-auto w3-margin-top w3-margin-bottom" style="max-width:600px;">
        <h1 class="w3-center">Orçamento Moodboard</h1>
        <p>Valor: R$ ${sum}</p>
        <p>Previsão: ${calcTime.call(time, sum) + (sum > 1 ? " dias" : " dia")}</p>
        <p>Data: ${new Date()}</p>
        <ol>
    `;
    for (const input of inputs) {
        const next = input.nextElementSibling.children[0];
        input.checked && next && (txt += `<li style="line-height:2;margin-top:8px;">${next.parentElement.textContent}</li>`);
    }
    txt += "</ol></div>";
    this.setAttribute("href", this.href + `LINK ORÇAMENTO: ${window.location.origin + folder}/budget/getbudget.html?data=${btoa(txt)}`);
}

const 
shop = document.getElementById("shop"),
time = document.getElementById("time"),
email = document.getElementById("email"),
inputs = document.getElementsByTagName("input");

let folder = "", sum = calc.call(inputs);

for (const input of inputs) { 
    input.addEventListener("change", () => {
        let sum = calc.call(inputs);
        calcTime.call(time, sum);
    }) 
}

calcTime.call(time, sum);