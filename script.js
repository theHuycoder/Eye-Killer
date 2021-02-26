window.onload = () => {
    // KHAI BAO DOM
    const header = document.getElementById("header");
    const start = document.getElementById("start");
    const playField = document.getElementById("play-field");
    const wrapper = document.querySelector("#wrapper");
    const timer = document.querySelector("#timer");
    const score = document.querySelector("#score");
    const btnReset = document.getElementById("reset");
    let count = 0;// BIEN DEM TINH DIEM
    score.innerHTML = count; // DIEM BAN DAU

    // HAM TINH MOT SO NGAU NHIEN TRONG KHOANG [MIN,MAX]
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    // HAM GET 3 GIA TRI RGB
    function colorGenerate() {
        let myColor = [];
        for (let i = 0; i < 3; i++) {
            myColor.push(getRandomNumber(0, 255))
        }
        return myColor;// TRA VE ARRAY [R,G,B]
    }
    // HAM TAO GAME
    function gameLoop(mode = "very easy") {
        let generatedColor = colorGenerate().join(",");//LAY MAU TU HAM KHOI TAO
        let randomOpacity; // BIEN LUU GIA TRI OPACITY RANDOM
        let randomIndex = Math.floor(getRandomNumber(0, 10)); // TAO NGAU NHIEN 1 TRONG 10 COT
        // LAM MAU KHAC BIET
        let seconds = 10; // BIEN DEM THOI GIAN
        timer.innerHTML = seconds;// PHAI GAN LUON DE TURN SAU SE TU DONG VE 10
        // BO DEM NGUOC THOI GIAN
        let interval = setInterval(() => {
            seconds -= 1;
            if (seconds < 4) {
                timer.classList.add("blink-1");
            } else {
                timer.classList.remove("blink-1");
            }
            if (seconds === 0) {
                clearInterval(interval);
                playField.innerHTML = `<img src="image/loser.jpg"/><div class="final">Được <span class="final-score">${count}</span> điểm nè!</div>`
                btnReset.style.display = "block";
            }
            timer.innerHTML = seconds;
        }, 1000);
        // TUY VAO DO KHO DE THAY DOI BIEN RANDOM OPACITY
        switch (mode) {
            case "very easy":
                randomOpacity = getRandomNumber(0.3, 0.4);
                break;
            case "easy":
                randomOpacity = getRandomNumber(0.4, 0.5);
                break;
            case "medium":
                randomOpacity = getRandomNumber(0.5, 0.6);
                break;
            case "hard":
                randomOpacity = getRandomNumber(0.6, 0.7);
                break;
            case "extreme":
                randomOpacity = getRandomNumber(0.7,0.8);
                break;
            case "very extreme":
                randomOpacity = getRandomNumber(0.8,0.9);
                break;
            case "hell":
                randomOpacity =getRandomNumber(0.9,0.95);
                break;
            default:
                break;
        }
        // TAO RA 10 COT , NEU I = RANDOM INDEX THI GAN MAU KHAC BIET VAO
        for (let i = 0; i < 10; i++) {
            let colorColumn = document.createElement("span");
            colorColumn.id = `color${i}`;
            wrapper.appendChild(colorColumn);
            if (i === randomIndex) {
                colorColumn.style.backgroundColor = `rgba(${generatedColor},${randomOpacity})`
            } else {
                colorColumn.style.backgroundColor = `rgba(${generatedColor},${1})`
            }
        }
        // LAY RA TAT CA 10 COT DA DUOC TAO
        let columnsList = document.querySelectorAll("#wrapper span");
        // GAN EVENT CLICK. NEU I = RANDOM INDEX THI CLICK DUNG
        for (let i = 0; i < columnsList.length; i++) {
            if (i === randomIndex) {
                columnsList[i].addEventListener("click", () => {
                    clearInterval(interval);
                    columnsList[i].classList.add("blink-1");
                    setTimeout(() => {
                        wrapper.innerHTML = "";
                        count++;
                        score.innerText = count;
                        if (count <= 5) {
                            gameLoop("very easy");
                        } else if (count > 5 && count <= 10) {
                            gameLoop("easy");
                        } else if (count >10  && count <= 15) {
                            gameLoop("medium");
                        } else if (count >15  && count <= 20) {
                            gameLoop("hard");
                        }else if (count > 20 && count <=25){
                            gameLoop("extreme");
                        }else if (count > 25 && count <=35){
                            gameLoop("very extreme");
                        }else {
                            gameLoop("hell");
                        }
                    }, 1000)
                })
            } else {
                columnsList[i].addEventListener("click", () => {
                    playField.innerHTML = `<img src="image/loser.jpg"/><div class="final">Được <span class="final-score">${count}</span> điểm nè!</div>`
                    btnReset.style.display = "block";
                })
            }
        }

    }

    start.addEventListener("click", () => {
        playField.style.display = "block";
        header.style.display = "none";
        document.body.classList.add("troll-face")
        gameLoop();
    })
    btnReset.addEventListener("click",()=>{
       location.reload();
    })
}



