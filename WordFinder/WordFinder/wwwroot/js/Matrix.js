const { now } = require("jquery");

function generateMatrix(rows, columns) {
    if (document.contains(document.getElementById("MatrixTable"))) {
        document.getElementById("MatrixTable").remove();
    }
    const matrix = document.createElement("table");
    matrix.setAttribute("id", "MatrixTable");

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("td");
            cell.setAttribute("class", "matrixCell");
            cell.setAttribute("id", `cell-${i}-${j}`);
            cell.setAttribute("contenteditable", true);
            cell.setAttribute("oninput", "oninputCell($('#cell-" + i + "-" + j +"'), 1)");

            row.appendChild(cell);
        }

        matrix.appendChild(row);
    }    
    document.getElementById("MatrixSection").appendChild(matrix);
}


function oninputCell(cellName, wordLength) {
    cellName.text(cellName.text().slice(0, wordLength).toUpperCase().replace(/[^A-Z]/g, ''));
}

function matrixSizeChange() {
    var n = $('#MatrixSizeSelect').find(":selected").val();
    generateMatrix(n, n);
}

function clearMatrix() {
    if ($('#MatrixSizeSelect').find(":selected").val() != '') {
        matrixSizeChange();
    }
}

function completeMatrix() {
    if ($('#MatrixSizeSelect').find(":selected").val() != '') {
        $(".matrixCell").each(function () {
            if ($(this).text() == '') {
                $(this).text(generateRandomCapitalLetter());
            }
        });
    }
}

function generateRandomCapitalLetter() {
    const randomNumber = Math.floor(Math.random() * 26) + 65;
    const randomLetter = String.fromCharCode(randomNumber);
    return randomLetter;
}

function find() {
    console.log("Start Time: " + Date.now());
    var n = $('#MatrixSizeSelect').find(":selected").val();
    if (n == '') {
        alert("Please complete de Matrix.");
        return;
    }

    var matrixToList = [];
    var wordsToFindList = [];

    matrixToList = getMatrix(n);
    wordsToFindList = getWordsToFindList();

    $.ajax({
        type: "POST",
        url: "Home/FindWords",
        data: { mainMatrix: matrixToList, wordsToFind: wordsToFindList },
        success: function (data) {
            showResults(data);
            console.log("END Time: " + Date.now());
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function showResults(results) {
    if (results != null) {
        var cellName = '';
        for (var i = 0; i < 10; i++) {
            cellName = "#result" + i;
            $(cellName).text(results[i]);
        }
    }
}

function getMatrix(n) {
    var matrixToReturn = [];
    for (var row = 0; row < n; row++) {
        var matrixLine = '';
        for (var column = 0; column < n; column++) {
            var cellName = "#cell-" + row + "-" + column;
            if ($(cellName).text() == '') {
                alert("Please complete the Matrix.");
                return;
            }
            else {
                matrixLine += $(cellName).text();
            }
        }
        matrixToReturn.push(matrixLine);
    }

    return matrixToReturn;
}

function getWordsToFindList() {
    var wordsToReturn = [];
    for (var row = 0; row < 10; row++) {
        var cellName = "#wordsToFind" + row;
        if ($(cellName).text() != '') {
            wordsToReturn.push($(cellName).text().toUpperCase().trim());
        }
    }

    return wordsToReturn;
}

