function Cell(col, row, width, height, padding, backgroundColor, borderColor, lineWidth, value, textColor, isSign) {
    // NECESSARY PROPERTIES TO DRAW AND DETECT THE CELL
    this.col = col;
    this.row = row;
    this.x = col * width + padding;
    this.y = row * height + padding;
    this.width = width - padding;
    this.height = height - padding;

    // CELL SETTINGS SUCH AS BACKGROUND COLOR AND BORDERCOLOR ...
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.lineWidth = lineWidth;
    this.value = value;
    this.isChosen = false;
    this.isSign = isSign;

    // STATUS VARIABLE - if isDead is true -> users cannot manipulate the cell
    this.isDead = false;

    // THIS FUNCTION IS USED TO DRAW THE CELL
    this.drawCell = function () {
        // draw cell background first
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        // draw a circle to show that the cell is selected or not
        if (this.isChosen && this.isDead != true) {
            ctx.beginPath();
            var radius = this.width / 20;
            ctx.arc(this.x + this.width - radius - padding, this.y + radius + padding, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#3a3c45';
            ctx.fill();
            ctx.closePath();
        } else {
            // set the cell's background color based on the current status
            ctx.fillStyle = this.isDead ? "#ff0000" : this.backgroundColor;
        }
        ctx.fill();
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.closePath();
    }

    // THIS FUNCTION IS USED TO DRAW THE CELL'S VALUE
    this.drawValue = function () {
        ctx.beginPath();
        // set the possition and the style
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "bold 40px Arial";
        // set the text color based on the current status
        ctx.fillStyle = this.isDead ? "white" : textColor;
        ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2);
        ctx.closePath();
    }

    // THIS FUNCTION IS USED TO DRAW BOTH CELL'S BACKGROUND AND VALUE
    this.draw = function () {
        this.drawCell();
        this.drawValue();
    }

    // THIS FUNCTION IS USED CHANGE THE CURRENT STATUS
    this.die = function () {
        this.isDead = true;
    }

    // THIS FUNCTION IS USED TO CHECK THE CURRENT STATUS
    this.checkStatus = function () {
        return this.isDead;
    }

    // THIS FUNCTION IS USED TO CHECK WHETHER THE CELL CONTAIN THE POINT (x, y) OR NOT
    this.contain = function (x, y) {
        // the point (x, y) is inside the cell if it is inside the boundary of the cell
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }
}

