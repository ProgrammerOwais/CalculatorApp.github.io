/*
// Calculator righting direction.
// Cursor moving error

*/
// Here in many place I comment console.log() => only for checking how it
// is working at the backend
/***************************** Theme changing functionality *******/
let themeChange = document.querySelector(".theme-circle");
let t = 1; // For theme numbering
let change = 0; // Tracking the theme
themeChange.addEventListener("click", () => {
    t++;
    change += 13;
    if (t == 4) {
        t = 1;
        change = 0;
    }
    themeChange.style.left = `${change}px`;
    toggleTheme();
});
// To set the theme
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}
function toggleTheme() {
    if (localStorage.getItem("theme") == "dark-theme") {
        setTheme("light-theme");
    } else if (localStorage.getItem("theme") == "light-theme") {
        setTheme("blue-theme");
    } else {
        setTheme("dark-theme");
    }
}
(function () {
    if (localStorage.getItem("theme") == "light-theme") {
        setTheme("light-theme");
    } else if (localStorage.getItem("theme") == "blue-theme") {
        setTheme("blue-theme");
    } else {
        setTheme("dark-theme");
    }
});
/****************** End of theme changing functionality*/

// ******************************** Calculator Functionality ******/
let btns = document.querySelectorAll(".btns");
let output = document.querySelector(".calc-output");

//data => "for input view":this var will store the result of input field i.e it show the entered input data

let data = "";

//data1=> "tracing data":  this will manipulate that input data & will add to the result
// i.e will track every data & make sure it stores all the input data into the 'result array'
let data1 = "";

// result => this is output  backend data which stores the entered input data
//& also store the result of the given data.
let result = [];

// Function for button clicking
function myCalc(e) {
    // console.log("click result value is : ", result);
    if (e.target.innerText == "=") {
        calcOperation();
        return;
    }
    if (
        e.target.innerText == "+" ||
        e.target.innerText == "-" ||
        e.target.innerText == "x" ||
        e.target.innerText == "/"
    ) {
        if (data1 != "") {
            if (typeof result[result.length - 1] == "number") {
                // if the last elm in result is num
                console.log("its a number");
                result[result.length - 1] += data1; // than cantenate the input to the result
                result[result.length - 1] = parseFloat(
                    result[result.length - 1]
                );
            } else {
                result.push(parseFloat(data1));
            }
        }
        result.push(e.target.innerText); // after adding the data also add the operations to the data
        data += e.target.innerText;

        // if double operator comes together i.e 2x-3 or 4/-2
        if (
            (e.target.innerText == "-" && result[result.length - 2] == "+") ||
            result[result.length - 2] == "-" ||
            result[result.length - 2] == "x" ||
            result[result.length - 2] == "/"
        ) {
            data1 = ""; // Make the tracing data empty then

            // Store the "-" in tracing so that you can add it into the result
            data1 += "-";
            result.pop();
            // console.log("the double operator worked");
        }
        if (data1 != "-") data1 = ""; // if tracing data dos'nt contain "-"
        // console.log(
        //     "result length: ",
        //     result.length + " & result is : ",
        //     result
        // );
        output.value = data;
    }
    // if user click on "Reset" button
    else if (e.target.innerText == "Reset") {
        result = [];
        data = "";
        data1 = "";
        output.value = data;
        return;
    }
    // if user click on "DEL" button
    else if (e.target.innerText == "DEL") {
        if ((data1 == "") & (result.length < 1)) return;
        if (data1 != "") {
            result.push(parseFloat(data1)); // push the last entered data into the result.
            data1 = "";
        }
        output.value = output.value.slice(0, -1);
        data = data.slice(0, -1); // remove the last data in input view
        data1 = data1.slice(0, -1); // remove the last tracing data
        // if the last elm is 'dot'
        if (output.value[output.value.length - 1] == ".") {
            output.value = output.value.slice(0, -1); // Also remove that dot
            data = data.slice(0, -1); // remove that dot in input view too
        }

        // Take the last data from result & store into var 'lastElm
        let lastElm = result[result.length - 1];

        // console.log("The result element is: ", result);
        // console.log("The last element is: ", lastElm);

        lastElm += ""; // convert it into string
        result.pop(); // Remove the last data from result.

        // if last elm contain more than 1 data char
        if (lastElm.length > 1) {
            lastElm = lastElm.slice(0, -1); // remove the last char
            //after removing last char form "lastElm"
            // Store it again in result
            result.push(parseFloat(lastElm));
        }

        // console.log("result data", result, "data1 is ", data1);

        return;
    } else {
        data = data + e.target.innerText;
        data1 = data1 + e.target.innerText;
        output.value = data;
    }
}
// ********************** Function for key pressing ***************
function myCalc2(key) {
    // console.log("key result value is : ", result);
    if (key == "=") {
        calcOperation();
        return;
    }
    if (key == "+" || key == "-" || key == "x" || key == "/") {
        if (data1 != "") {
            if (typeof result[result.length - 1] == "number") {
                // if the last elm in result is num
                result[result.length - 1] += data1; // than cantenate the input to the result
                result[result.length - 1] = parseFloat(
                    result[result.length - 1]
                );
            } else {
                result.push(parseFloat(data1));
            }
        }
        result.push(key); // after adding the data also add the operations to the data
        data += key;

        // if double operator comes together i.e 2x-3 or 4/-2
        if (
            (key == "-" && result[result.length - 2] == "+") ||
            result[result.length - 2] == "-" ||
            result[result.length - 2] == "x" ||
            result[result.length - 2] == "/"
        ) {
            data1 = ""; // Make the tracing data empty then
            // Store the "-" in tracing so that you can add it into the result
            data1 += "-";
            result.pop();
            // console.log("the double operator worked");
        }
        if (data1 != "-") data1 = ""; // if tracing data dosn't contain "-"

        // console.log(
        //     "result length: ",
        //     result.length + " & result is : ",
        //     result
        // );
    }
    // if user press "delete" button on keyboard
    else if (key == "Reset") {
        result = [];
        data = "";
        data1 = "";
        output.value = data;
        return;
    }
    // if user press "Backspace" button on keyboard
    else if (key == "DEL") {
        if ((data1 == "") & (result.length < 1)) return;
        if (data1 != "") {
            result.push(parseFloat(data1)); // push the last entered data into the result.
            data1 = "";
        }
        // if the last elm is 'dot'
        if (output.value[output.value.length - 1] == ".") {
            output.value = output.value.slice(0, -1); // Also remove it
        }

        // Take the last data from result & store into var 'lastElm
        let lastElm = result[result.length - 1];

        // console.log("The del function is exectued: ");
        // console.log("The result element is: ", result);
        // console.log("The last element is: ", lastElm);

        lastElm += ""; // convert it into string
        result.pop(); // Remove the last data from result.
        // if last elm contain more than 1 data char
        if (lastElm.length > 1) {
            lastElm = lastElm.slice(0, -1);
            result.push(parseFloat(lastElm));
        }
        data = data.slice(0, -1); // remove the last data in input view
        data1 = data1.slice(0, -1); // remove the last tracing data
        console.log("result data", result, "data1 is ", data1);

        return;
    } else {
        data = data + key;
        data1 = data1 + key;
    }
}
function calcOperation() {
    if (data1 != "") {
        if (typeof result[result.length - 1] == "number") {
            // if the last elm in result is num
            result[result.length - 1] += data1; // than cantenate the input to the result
            result[result.length - 1] = parseFloat(result[result.length - 1]);
        } else {
            result.push(parseFloat(data1));
        }
    }
    // console.log("result before calculation", result);

    // *** First:  For multiplicatin & Division
    for (let i = 0; i < result.length; i++) {
        if (result[i] == "x" || result[i] == "/") {
            switch (result[i]) {
                case "x":
                    result[i] = result[i - 1] * result[i + 1];
                    break;
                case "/":
                    result[i] = result[i - 1] / result[i + 1];
                    break;

                default:
                    console.log("it is not the correct data");
                    break;
            }
            result.splice(i - 1, 1);
            result.splice(i, 1);
            i = 0;
        }
    }
    // 2nd: For Addition & subtraction
    for (let i = 0; i < result.length; i++) {
        if (result.length == 1) {
            i = result.length + 1;
            continue;
        }
        if (result[i] == "+" || result[i] == "-") {
            switch (result[i]) {
                case "+":
                    result[i] = result[i - 1] + result[i + 1];

                    break;
                case "-":
                    result[i] = result[i - 1] - result[i + 1];
                    break;
                default:
                    console.log("it is not the correct data");
                    break;
            }
            result.splice(i - 1, 1);
            result.splice(i, 1);
            i = 0;
        }
    }
    // console.log("after = operation the result is : ", result);

    output.value = result;
    result = [];
    result[0] = parseFloat(output.value);
    data = output.value;
    data1 = "";
}
function keyChecking(e) {
    let pattern = "1234567890-+/x.";
    if (pattern.includes(e.key)) {
        myCalc2(e.key);
    } else if (e.keyCode == 13) myCalc2("=");
    else if (e.keyCode == 8) myCalc2("DEL");
    else if (e.keyCode == 16) {
    } else if (e.keyCode == 46) myCalc2("Reset");
    else {
        // *** important note    onkeydown & onkeyup ****************
        // as this block is used to remove the unwanted character in calculator like 'a','b', etc.
        output.value = output.value.slice(0, -1);
        // The above code of line is used to remove that entered character
        // It works good as it is expected if I use "onkeyup" event in input tag
        // But if I use "keydown" event it will not work the same, here in this
        // it ramains the first entered character always( not removing it) & removes
        // The second enter character.
        // Don't know why but it works like that.
    }
}
//****$$$$$$$$$$$$$$$$The above is the complete coding of current calculator  ********$$$$$$$$$$$$$*/

/** 2nd type of calculator, it will calculate auto by typing/clicking on operation(+-=x/) but it is haf code **
 * function fu(e) {
    // let num = parseInt(e.target.innerText);
    if (e.target.innerText == "=") {
        calcOperation("=");
        return;
    }
    if (
        e.target.innerText == "+" ||
        e.target.innerText == "-" ||
        e.target.innerText == "x" ||
        e.target.innerText == "/"
    ) {
        if (data1 != "") {
            // checking if data is already exist
            if (result.length == 1) {
                // if data contain one value
                result[0] += data1; // than concatenate the new data with prev data.
                result[0] = parseInt(result[0]);
            } else {
                // if it does'nt contain any value that add the new data.
                result.push(parseInt(data1));
            }
            // result.push(parseInt(data1));
        }
        result.push(e.target.innerText); // after adding the data also add the operations to the data
        data += e.target.innerText;
        if (
            (result.length > 2 &&
                e.target.innerText == "-" &&
                result[result.length - 2] == "+") ||
            result[result.length - 2] == "-" ||
            result[result.length - 2] == "x" ||
            result[result.length - 2] == "/"
        ) {
            data1 = "";
            data1 += "-";
            result.pop();
            console.log("the double operator worked");
        } else if (result.length > 2) {
            calcOperation(e.target.innerText);
        }
        if (data1 != "-") data1 = "";
        // console.log("good");
        console.log(
            "result length: ",
            result.length + " & result is : ",
            result
        );
        // output.value = e.target.innerText;
        output.value = data;
    } else if (e.target.innerText == "Reset") {
        result = [];
        data = "";
        data1 = "";
        output.value = data;
        return;
    } else if (e.target.innerText == "DEL") {
        if ((data1 == "") & (result.length < 1)) return;
        // if (data1 != "") {
        //     result.push(parseInt(data1)); // push the last entered data into the result.
        //     data1 = "";
        // }
        output.value = output.value.slice(0, -1);
        let lastElm = result[result.length - 1];
        console.log("The result element is: ", result);
        console.log("The last element is: ", lastElm);
        lastElm += "";
        result.pop();
        if (lastElm.length > 1) {
            lastElm = lastElm.slice(0, -1);
            result.push(parseInt(lastElm));
        }
        data = data.slice(0, -1);
        data1 = data1.slice(0, -1);
        console.log("result data", result, "data1 is ", data1);

        return;
    } else {
        data = data + e.target.innerText;
        data1 = data1 + e.target.innerText;
        // data = data + e.target.innerText;
        // result.push(parseInt(e.target.innerText));
        output.value = data;
    }
    // console.log(typeof );
}
function calcOperation(operates) {
    if (operates == "=") {
        result.push(parseInt(data1));
        switch (result[1]) {
            case "+":
                output.value = result[0] + result[2];
                break;
            case "-":
                output.value = result[0] - result[2];
                break;
            case "x":
                output.value = result[0] * result[2];
                break;
            case "/":
                output.value = result[0] / result[2];
                break;

            default:
                console.log("it is not the correct data");
                break;
        }
        result = [];
        result.push(parseInt(output.value));
        // data = "";
        data = output.value;
        data1 = "";
        // data1 = output.value;
        console.log(" in equAL function, result", result);
        console.log(" in equAL function, data", data);
        return;
    } else {
        result.push(parseInt(data1));
        let backResult;
        switch (result[1]) {
            case "+":
                backResult = result[0] + result[2];
                break;
            case "-":
                backResult = result[0] - result[2];
                break;
            case "x":
                backResult = result[0] * result[2];
                break;
            case "/":
                backResult = result[0] / result[2];
                break;

            default:
                console.log("it is not the correct data");
                break;
        }
        result = [];
        result.push(backResult);
        result.push(operates);
        data1 = backResult;
        data = backResult;
        data += operates;
        console.log("the bottom result is", result);
        return;
    }
}
 */
