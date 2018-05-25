// THIS FUNCTION IS USED TO CREATE <P>
function createP(parent, text, classNames) {
    // create a P element
    var paragraph = document.createElement("P");
    // add text to the element
    if (text) {
        paragraph.innerText = text;
    }
    // add classes to the element
    if (classNames) {
        for (var i = 0; i < classNames.length; i++) {
            paragraph.classList.add(classNames[i]);
        }
    }
    // add the element to its parent or document.body
    if (parent) {
        parent.appendChild(paragraph);
    } else {
        document.body.appendChild(paragraph);
    }
    // return the element
    return paragraph;
}

// THIS FUNCTION IS USED TO CREATE <BUTTON>
function createButton(parent, text, classNames) {
    // create a Button element
    var buttonElement = document.createElement("BUTTON");
    // add text to the element
    if (text) {
        var text = document.createTextNode(text);
        buttonElement.appendChild(text);
    }
    // add classes to the element
    if (classNames) {
        for (var i = 0; i < classNames.length; i++) {
            buttonElement.classList.add(classNames[i]);
        }
    }
    // add the element to its parent or document.body
    if (parent) {
        parent.appendChild(buttonElement);
    } else {
        document.body.appendChild(buttonElement);
    }
    // return the element
    return buttonElement;
}

// THIS FUNCTION IS USED TO CREATE <H1>...<H6>
function createH(parent, text, level, classNames) {
    // set the boundary for the level
    if (level >= 6) {
        level = 6;
    }
    if (level <= 1) {
        level = 1;
    }
    // create a H element
    var h = document.createElement("H" + level);
    // add text to the element
    if(text) {
        h.innerText = text;
    }
    // add classes to the element
    if (classNames) {
        for (var i = 0; i < classNames.length; i++) {
            h.classList.add(classNames[i]);
        }
    }
    // add the elements to its parent or document.body
    if (parent) {
        parent.appendChild(h);
    } else {
        document.body.appendChild(h);
    }
    // return the element
    return h;
}

// THIS FUNCTION IS USED TO CREATE A <DIV>
function createDiv(parent, text, classNames) {
    // create a Div element
    var divElement = document.createElement("DIV");
    // add text to the element
    if (text) {
        divElement.innerHTML = text;
    }
    // add classes to the element
    if (classNames) {
        for (var i = 0; i < classNames.length; i++) {
            divElement.classList.add(classNames[i]);
        }
    }
    // add the elememt to its parent or document.body
    if (parent) {
        parent.appendChild(divElement);
    } else {
        document.body.appendChild(divElement);
    }
    // return the element
    return divElement;
}