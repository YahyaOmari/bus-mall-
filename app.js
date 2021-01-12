'use strict';

var leftProductImage = document.getElementById("left_image_img");
var middleProductImage = document.getElementById("middle_image_img");
var rightProductImage = document.getElementById("right_image_img");

var all_clicks = document.getElementById('all_clicks')
var resultsID = document.getElementById('resultsID')
var canvas = document.getElementById('productChart').getContext('2d');

// Global array, to make it easier to use them
var arrayOfProduct = [];
var shownImages = [];
var trials = 25;

// constructor
function Product(name, pathImage) {
    this.name = name;
    this.pathImage = "IMG/" + pathImage;

    this.timeClicked = 0;
    this.showImage = 0;
    
    arrayOfProduct.push(this);

}

// storing the data in the browser
function storeData() {
    localStorage.setItem('order', JSON.stringify(arrayOfProduct));
    console.log(arrayOfProduct);
}
// reverse string to object
function checkStorage() {
    if (localStorage.length > 0) {
        arrayOfProduct = JSON.parse(localStorage.getItem('order'));
        countImage;
    }
}
// checking name of the image
function checkAvailability(selectedProductName) {

    for (var i = 0; i < shownImages.length; i++) {
        if (shownImages[i].name === selectedProductName) {
            return true;
        }
    }
    return false;
}

function randomPorduct() {

    do {
        var leftImage = Math.floor(Math.random() * (arrayOfProduct.length - 1))
        var leftProductImageName = arrayOfProduct[leftImage].name;
    } while (checkAvailability(leftProductImageName));

    do {
        var middleImage = Math.round(Math.random() * (arrayOfProduct.length - 1))
        var middleProductImageName = arrayOfProduct[middleImage].name;

        var rightImage = Math.round(Math.random() * (arrayOfProduct.length - 1))
        var rightProductImageName = arrayOfProduct[rightImage].name;

    } while (leftImage === middleImage || checkAvailability(middleProductImageName) || rightImage === middleImage || checkAvailability(rightProductImageName) || leftImage === rightImage);

    // to clear the array
    shownImages = [];
    shownImages.push(
        arrayOfProduct[leftImage],
        arrayOfProduct[middleImage],
        arrayOfProduct[rightImage]
    )

    renderImage(leftImage, middleImage, rightImage);
}

// rendering images
function renderImage(leftImage, middleImage, rightImage) {

    leftProductImage.setAttribute('src', arrayOfProduct[leftImage].pathImage);
    middleProductImage.setAttribute('src', arrayOfProduct[middleImage].pathImage);
    rightProductImage.setAttribute('src', arrayOfProduct[rightImage].pathImage);

    leftProductImage.textContent = arrayOfProduct[leftImage].name;
    middleProductImage.textContent = arrayOfProduct[leftImage].name;
    rightProductImage.textContent = arrayOfProduct[leftImage].name;

    arrayOfProduct[leftImage].showImage++;
    arrayOfProduct[middleImage].showImage++;
    arrayOfProduct[rightImage].showImage++;
}

function renderChart() {
    // creating empty arrays to push them in the chart object
    var arrayOfProductName = [];
    var arrayOfProductClicked = [];
    var arrayOfProductShown = [];

    // pushing name, clicked and show image to an empty arrays
    for (var i = 0; i < arrayOfProduct.length; i++) {
        arrayOfProductName.push(arrayOfProduct[i].name);
        arrayOfProductClicked.push(arrayOfProduct[i].timeClicked);
        arrayOfProductShown.push(arrayOfProduct[i].showImage);
    }

    // Creating a chart
    var myChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: arrayOfProductName, // in x axis will appear the names of products
            datasets: [{
                label: '# of Clicks',
                data: arrayOfProductClicked,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgb(255, 255, 255)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgb(106, 90, 205)',
                    'rgb(238, 130, 238)',
                    'rgba(30, 186, 119, 0.2)',
                    'rgb(180, 180, 180)',
                    'rgb(0, 0, 0)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgb(255, 165, 0)',
                    'rgb(60, 179, 113)',
                    'rgb(240, 240, 240)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgb(255, 255, 255)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'


                ],
                borderWidth: 1
            }, {
                label: 'Time shown for the Images',
                data: arrayOfProductShown,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgb(255, 255, 255)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgb(106, 90, 205)',
                    'rgb(238, 130, 238)',
                    'rgba(30, 186, 119, 0.2)',
                    'rgb(180, 180, 180)',
                    'rgb(0, 0, 0)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgb(255, 165, 0)',
                    'rgb(60, 179, 113)',
                    'rgb(240, 240, 240)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgb(255, 255, 255)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function checkProduct(indicator) {

    for (var i = 0; i < arrayOfProduct.length; i++) {
        if (arrayOfProduct[i].pathImage === indicator) {
            arrayOfProduct[i].timeClicked++;
            trials--;
            
        }
    }
}

function countImage(event) {
    var targetId = event.target.id;

    if (trials > 0) {

        if (targetId === "left_image_img" || "middle_image_img" || "right_image_img") {
            var indicator = event.target.getAttribute('src');
            checkProduct(indicator);
            randomPorduct();
        }
    } else {
        all_clicks.removeEventListener('click', countImage);
        console.log(arrayOfProduct);
        renderChart();
        storeData();

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
// all_clicks.addEventListener('submit', countImage);
all_clicks.addEventListener('click', countImage);
checkStorage();




// var parentElement = document.getElementById("creatUl");
// var ul = document.createElement('ul');
// parentElement.appendChild(ul);

// function results() {
//     for (var i = 0; i < arrayOfProduct.length; i++) {
//         var list = document.createElement('li');
//         // console.log(arrayOfProduct.length);
//         list.textContent = "Image " + " " + arrayOfProduct[i].name + " " + " showed " + arrayOfProduct[i].showImage + " " + " and clicked :" + arrayOfProduct[i].timeClicked;
//         ul.appendChild(list);
//     }
//     // renderChart();
// }

