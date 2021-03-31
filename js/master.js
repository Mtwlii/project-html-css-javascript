let mainColors = localStorage.getItem("color_option");
let backdroundLocalItem = localStorage.getItem("background_option");
let backdroundOption = true;
let backgroundInterval;
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg ", "04.jpg", "05.jpg"];
//!-----------------------------------------------

if (mainColors !== null) {
    // console.log('local Storege is not Empaty')

    document.documentElement.style.setProperty("--main-color", mainColors);

    //remaove actine class from all color list item
    document.querySelectorAll(".color-list li").forEach((element) => {
        element.classList.remove("active");

        if (element.dataset.color === mainColors) {

            element.classList.add("active");

        }
    });
}
//!-----------------------------------------------------------

//check if random background local storage is not empty
if (backdroundLocalItem !== null) {

    if (backdroundLocalItem === 'true') {
        backdroundOption = true;

    } else {
        backdroundOption = false;

    }

    document.querySelectorAll(".random-backdrounds span").forEach(element => {
        element.classList.remove("active");
    })
    if (backdroundLocalItem === 'true') {
        document.querySelector(".random-backdrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backdrounds .no").classList.add("active");

    }
}
//!-----------------------------------------------------------

//toggle spain class on  icon 

document.querySelector(".toggle-setting .fa-cog").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};
//!-----------------------------------------------------------

//Switch Main Color

const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {

        //set color in root

        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        //set color on local storage

        localStorage.setItem("color_option", e.target.dataset.color);

        //remove active class from all children

        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });

        //add active class

        e.target.classList.add("active");


    });
});
//!-----------------------------------------------------------

//Random Background Option
function randomaizeImgs() {
    if (backdroundOption === true) {


        //Get Random Number
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            //Change Background Imgs Url.
            landingPage.style.backgroundImage =
                'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 6000);


    }
}

randomaizeImgs();

//!-----------------------------------------------------------

//Switch Random background color

const randomBackgroundElement = document.querySelectorAll(".random-backdrounds span");
randomBackgroundElement.forEach((span) => {
    span.addEventListener("click", (e) => {

        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });

        //add active class
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {

            backdroundOption = true;

            randomaizeImgs();

            localStorage.setItem("background_option", true)

        } else {
            backdroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)
        }
    });
});
//!-----------------------------------------------------------

//!Select Skills Selector

let ourSkills = document.querySelector(".skills");


window.onscroll = function () {

    //Skils offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    //console.log(skillsOffsetTop)

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // console.log(skillsOuterHeight)

    //window hight 
    let windowHeight = this.innerHeight;
    console.log(windowHeight)

    //window scrolltop
    let windowScrollTop = this.pageYOffset;
    // console.log(windowScrollTop)


    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        //Create over Lay Element 
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append overlay To Body 
        document.body.appendChild(overlay);
        //Create The Popup
        let popupBox = document.createElement("div")

        //Add Class To The Popup Box
        popupBox.className = 'popup-box';
        if (img.alt !== null) {

            //create heading 
            let imagHeading = document.createElement("h3");

            //create text for heading 
            let imgText = document.createTextNode(img.alt);

            //Appinf the text to heading 
            imagHeading.appendChild(imgText);

            //append the heading to the popup box 
            popupBox.appendChild(imagHeading);


        }
        //Create the image
        let popupImage = document.createElement("img")

        //Set Image Sourse 

        popupImage.src = img.src;

        //Add Img To Popup Box
        popupBox.appendChild(popupImage);

        //Append popup Box To Body
        document.body.appendChild(popupBox)

        //Create The close span 
        let closeButton = document.createElement("span");

        //Create the close button text 
        let closeButtonText = document.createTextNode("X")

        //append text to close button 
        closeButton.appendChild(closeButtonText);

        // add class to close button 
        closeButton.className = 'close-button';

        //add close button to the popup box 
        popupBox.appendChild(closeButton);

    });

});

//close popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button') {
        //remove tehe carent popup
        e.target.parentNode.remove();

        //remove overlay 
        document.querySelector(".popup-overlay").remove(); 
    }
})