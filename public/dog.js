function dogResults() {
    window.addEventListener("DOMContentLoaded", () => {
        const dogResults = JSON.parse(localStorage.getItem("dogResults"));

            for(let i = 0; i < 10; i++) {
               
                const dogNum = document.getElementById(String(i));
                const dogName = dogResults[i].replace(/[^a-zA-Z ]/g, '').replace(/ /g, '');
                
                const link = document.createElement("a");

                link.href = "https://www.petmd.com/dog/breeds/" + dogName.toLowerCase().slice(1);;
                link.textContent = dogResults[i];
                document.getElementById(String(i)).appendChild(link);
                // dogNum.innerText = dogResults[i];
               // dogNum.innerHTML = '<a href="https://www.petmd.com/dog/breeds/${dogResults[i]}">${dogResults[i]}</a>';
            }
        });
}
dogResults()























