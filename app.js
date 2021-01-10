'use strict';

var arrayOfProduct = [];

var leftProductImage = document.getElementById("left_image_img");
var middleProductImage = document.getElementById("middle_image_img");
var rightProductImage = document.getElementById("right_image_img");

var all_clicks = document.getElementById('all_clicks')

var trials = 8;

function Product(name, pathImage){
    this.name=name;
    this.pathImage= "IMG/" + pathImage ;


    this.timeClicked = 0;
    this.showImage = 0;
    arrayOfProduct.push(this);
}

function randomPorduct(){
    
    var leftImage = Math.floor(Math.random() * (arrayOfProduct.length - 1))
    do {
        var middleImage = Math.floor(Math.random() * (arrayOfProduct.length - 1))
        var rightImage = Math.floor(Math.random() * (arrayOfProduct.length - 1))

    } while (leftImage === middleImage || leftImage === rightImage || rightImage === middleImage);

    renderImage(leftImage,middleImage,rightImage);
}

function renderImage(leftImage, middleImage, rightImage){

    leftProductImage.setAttribute('src', arrayOfProduct[leftImage].pathImage);
    middleProductImage.setAttribute('src',arrayOfProduct[middleImage].pathImage);
    rightProductImage.setAttribute('src',arrayOfProduct[rightImage].pathImage);
    
    arrayOfProduct[leftImage].showImage++;
    console.log(    arrayOfProduct[leftImage].showImage
        );
    arrayOfProduct[middleImage].showImage++;
    arrayOfProduct[rightImage].showImage++;
}

function checkProduct(indicator){

    for (var index = 0; index < arrayOfProduct.length; index++) {
        if (arrayOfProduct[index].pathImage === indicator){
        arrayOfProduct[index].timeClicked++;
        trials--;
        }
    }
}

function countImage(event){

    console.log(event.target);

    var targetId = event.target.id;
    console.log(targetId);
    
    arrayOfProduct[1].timeClicked++
    console.log(arrayOfProduct[1]);


    if (trials !== 1){

        if(targetId === "left_image_img" || "middle_image_img" || "right_image_img"){
            var indicator = event.target.getAttribute('src');
            checkProduct(indicator);
            randomPorduct();
        }
    } else {
        all_clicks.removeEventListener('click', countImage);
        console.log(arrayOfProduct);
    }
}

new Product('bag', 'bag.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');

new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pen', 'pen.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('tauntaun', 'tauntaun.jpg');

new Product('unicorn', 'unicorn.jpg');
new Product('usb', 'usb.gif');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');

randomPorduct();
all_clicks.addEventListener('click', countImage);



var parentElement = document.getElementById("creatUl");
var ul = document.createElement('ul');
parentElement.appendChild(ul);

function results() {
    for (var i=0; i<arrayOfProduct.length; i++){
        var list = document.createElement('li');
        list.textContent = "Image " + arrayOfProduct[i].showImage + "Clicked" + arrayOfProduct[i].timeClicked;
        ul.appendChild(list);
    }
}



// var result = document.getElementById("resultsID");
// document.getElementById('results').innerHTML="Image " + arrayOfProduct[i].showImage;

