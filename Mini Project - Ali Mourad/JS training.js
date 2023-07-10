function myFunction() {
    cars.sort();
    document.getElementById('demo').innerHTML = "Lol!";
    alert("Paragraph Changed!");
    document.getElementById('self').innerHTML = "Hello! My name is " + person.fullName() + ", I am a " + person.age + " years old " + person.Nationality + " student currently studying computer science at Beirut Arab University!";
    document.getElementById('b2').style.display = "block";
};
// document.write("\nHello There!\n");
// var x = 5, y = 6, z; //var is used to support OLD browsers.
// z = x + y;
// document.writeln("z = x + y = " + z);
const person = {
    fName: "Ali",
    lName: "Mrad",
    age: 21,
    Nationality: "Lebanese",
    fullName: function () {
        return this.fName + " " + this.lName;
    }
};

const cars = ["Mercedes", "Volvo", "BMW"];
function display() {
    document.getElementById("demo2").innerHTML = cars.join(" ");
}

cars.sort();

var text = "<ul>";
for (let i = 0; i < cars.length; i++) {
    text += "<li>" + cars[i] + "</li>";
}

function looping() {
    document.getElementById("demo2").innerHTML = text;
}




