
const formComponent = `
    <form action="" id="form">
        <input type="text" name="title">
        <input type="file" name="picture">
        <button>Send</button>
    </form>
`


function loadEvent() {
    const root = document.getElementById("root")

    root.insertAdjacentHTML("beforeend", formComponent)

    const formElement = document.getElementById("form");
    formElement.addEventListener("submit", e => {
        e.preventDefault();
       /*  console.dir(e); */

        const formData = new FormData() //doboz amiben küldjük az adatokat
        formData.append("title", e.target.querySelector(`input[name="title"]`).value) // e.target, mert a for esetében az egész formra vonatkozik a submit tehát meg lehet fogni ígyis
        formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0]) //akár egy vagy több mindig tömb jön létre, így ha csak egy akkor a 0. elem kell

        const fetchSettings = {
            method: "POST",
            body: formData
        }

        fetch("/", fetchSettings) //megadjuk az url ahova postolnánk ez "/", aztán egy objektumot amit elmentettünk változóba
            .then(data => {
                if (data.status === 200) {
                    e.target.outerHTML = "done"
                    console.dir(data);
                }
            })
            .catch(error => {
                e.target.outerHTML = "error";
                console.dir(error)
            } )
    })
}

window.addEventListener("load", loadEvent)