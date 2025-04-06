

//スプライト
function Sprite(width, height) {

    //プロパティ
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.dir = 0;
    this.image;
    this.imageType = "image";
    this.draw = function () { }
    this.pivotX = 0;
    this.pivotY = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.layer = 0;
    this.update = function () { }
    this.onmouseup = function () { }
    this.onmousedown = function () { }
    this.oncollideenter = function () { }
    this.oncollideexit = function () { }
    this.onmousemove = function () { }

    this.system = {
        collided: new Array(0),
        mouseSit: { mouseup: false, mousedown: false, mousemove: false },
        deleted: false
    }

    //メソッド
    this.translate = function (x, y) {
        var length = Math.sqrt((x * x) + (y * y));
        let angle = 0;
        if (x > 0) {
            angle = Math.asin(y / length);
        } else {
            angle = Math.PI - Math.asin(y / length);
        }
        angle += Math.deToRa(this.dir);
        this.x += Math.cos(angle) * length;
        this.y += Math.sin(angle) * length;
    }
}


//ゲーム
function Game(width, height, parent, canvas) {

    //プロパティ
    if (!canvas) {
        this.canvas = document.createElement("canvas");
        parent.appendChild(this.canvas);
    } else {
        this.canvas = canvas;
    }
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: 1px solid black;";
    this.coordinateSize = 1;
    this.update = function () { }
    this.onmouseup = function () { }
    this.onmousedown = function () { }
    this.onmousemove = function () { }
    this.backgroundColor = "#FFFFFF";

    var ctx = this.canvas.getContext("2d");
    let childs = new Array(0);
    let colliders = new Array(0);
    let interval;
    let coordinateSize = 1;
    let userUpdate = function () { }
    let userMouseDown = function () { }
    let userMouseMove = function () { }
    let userMouseUp = function () { }
    let backgroundColor = "#FFFFFF";
    let mouseSit = { mouseup: false, mousedown: false, mousemove: false };

    //クリックイベント
    function mouseUp(e) {
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.pageX - posX) / coordinateSize,
            y: (e.pageY - posY) / coordinateSize
        };

        if (!mouseSit.mouseup) userMouseUp(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mouseup) {
                    colliders[i].parent.onmouseup(touchPos);
                    colliders[i].parent.system.mouseSit.mouseup = true;
                }
            }
        }
    }
    function touchStart(e) {
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.changedTouches[0].pageX - posX) / coordinateSize,
            y: (e.changedTouches[0].pageY - posY) / coordinateSize
        };

        if (!mouseSit.mousedown) userMouseDown(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mousedown) {
                    colliders[i].parent.onmousedown(touchPos);
                    colliders[i].parent.system.mouseSit.mousedown = true;
                }
            }
        }
    }
    function mouseDown(e) {
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.pageX - posX) / coordinateSize,
            y: (e.pageY - posY) / coordinateSize
        };

        if (!mouseSit.mousedown) userMouseDown(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mousedown) {
                    colliders[i].parent.onmousedown(touchPos);
                    colliders[i].parent.system.mouseSit.mousedown = true;
                }
            }
        }
    }
    function touchEnd(e) {
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.changedTouches[0].pageX - posX) / coordinateSize,
            y: (e.changedTouches[0].pageY - posY) / coordinateSize
        };

        if (!mouseSit.mouseup) userMouseUp(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mouseup) {
                    colliders[i].parent.onmouseup(touchPos);
                    colliders[i].parent.system.mouseSit.mouseup = true;
                }
            }
        }
    }
    function mouseMove(e) {
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.pageX - posX) / coordinateSize,
            y: (e.pageY - posY) / coordinateSize
        };

        if (!mouseSit.mousemove) userMouseMove(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mousemove) {
                    colliders[i].parent.onmousemove(touchPos);
                    colliders[i].parent.system.mouseSit.mousemove = true;
                }
            }
        }
    }
    function touchMove(e) {
        e.preventDefault();
        var clientRect = this.getBoundingClientRect();
        var posX = clientRect.left + window.pageXOffset;
        var posY = clientRect.top + window.pageYOffset;
        touchPos = {
            x: (e.changedTouches[0].pageX - posX) / coordinateSize,
            y: (e.changedTouches[0].pageY - posY) / coordinateSize
        };

        if (!mouseSit.mousemove) userMouseMove(touchPos);
        for (var i = 0; i < colliders.length; i++) {
            if (mouseIsOnCollider(touchPos, colliders[i])) {
                if (!colliders[i].parent.system.mouseSit.mousemove) {
                    colliders[i].parent.onmousemove(touchPos);
                    colliders[i].parent.system.mouseSit.mousemove = true;
                }
            }
        }
    }
    this.canvas.addEventListener("mouseup", mouseUp);
    this.canvas.addEventListener("touchend", touchEnd);
    this.canvas.addEventListener("mousedown", mouseDown);
    this.canvas.addEventListener("touchstart", touchStart);
    this.canvas.addEventListener("mousemove", mouseMove);
    this.canvas.addEventListener("touchmove", touchMove);

    //コライダ系
    function mouseIsOnCollider(e, c) {
        var x = c.x * c.parent.scaleX + c.parent.x;
        var y = c.y * c.parent.scaleY + c.parent.y;
        var w = c.width * c.parent.scaleX;
        var h = c.height * c.parent.scaleY;
        switch (c.system.type) {
            case "r":
                if (x <= e.x && e.x <= x + w
                    && y <= e.y && e.y <= y + h) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    function checkCollide(c1, c2) {
        var x1 = c1.parent.x + (c1.x * c1.parent.scaleX);
        var y1 = c1.parent.y + (c1.y * c1.parent.scaleY);
        var x2 = c2.parent.x + (c2.x * c2.parent.scaleX);
        var y2 = c2.parent.y + (c2.y * c2.parent.scaleY);
        var w1 = c1.width * c1.parent.scaleX;
        var h1 = c1.height * c1.parent.scaleY;
        var w2 = c2.width * c2.parent.scaleX;
        var h2 = c2.height * c2.parent.scaleY;
        switch (c1.system.type + c2.system.type) {
            case "rr":
                if (((x1 <= x2 && x2 <= x1 + w1) || (x1 <= x2 + w2 && x2 + w2 <= x1 + w1) || (x2 <= x1 && x1 <= x2 + w2))
                    && ((y1 <= y2 && y2 <= y1 + h1) || (y1 <= y2 + h2 && y2 + h2 <= y1 + h1) || (y2 <= y1 && y1 <= y2 + h2))) {
                    return true;
                } else {
                    return false;
                }
        }
        return false;
    }

    //毎時更新
    function myUpdate() {

        mouseSit.mouseup = false;
        mouseSit.mousedown = false;
        mouseSit.mousemove = false;
        userUpdate();

        for (i = 0; i < childs.length; i++) {

            var sprite = childs[i];
            sprite.update();
        }

        var i, j;

        //当たり判定
        for (i = 0; i < colliders.length; i++) {
            colliders[i].parent.system.mouseSit.mouseup = false;
            colliders[i].parent.system.mouseSit.mousedown = false;
            colliders[i].parent.system.mouseSit.mousemove = false;

            for (var j = 0; j < colliders.length; j++) {
                if ((colliders[j].group != colliders[i].group || colliders[i].group == "none")
                    && colliders[j].parent != colliders[i].parent && colliders[j].group != "click" && colliders[i].group != "click") {
                    if (checkCollide(colliders[i], colliders[j])) {
                        if (!colliders[i].parent.system.collided.includes(colliders[j])) {
                            colliders[i].parent.system.collided.push(colliders[j]);
                            colliders[i].parent.oncollideenter(colliders[j]);
                        }
                    } else {
                        if (colliders[i].parent.system.collided.includes(colliders[j])) {
                            colliders[i].parent.system.collided.splice(colliders[i].parent.system.collided.indexOf(colliders[j], 1), 1);
                            colliders[i].parent.oncollideexit(colliders[j]);
                        }
                    }
                }
            }
        }

        //削除
        childs = childs.filter(elm => {
            return !elm.system.deleted;
        });
        colliders = colliders.filter(elm => {
            return !elm.system.deleted;
        });

        ctx.clearRect(0, 0, 10000, 10000);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 10000, 10000);

        //スプライト描画
        let layerSprites = childs;
        layerSprites.sort(function (a, b) {
            return b.layer - a.layer;
        });

        for (i = 0; i < layerSprites.length; i++) {

            var sprite = layerSprites[i];

            ctx.save();
            ctx.scale(coordinateSize, coordinateSize);
            ctx.translate(sprite.x, sprite.y);
            var radDir = sprite.dir * Math.PI / 180;
            ctx.rotate(radDir);
            ctx.scale(sprite.scaleX, sprite.scaleY);
            ctx.translate(sprite.pivotX * -1, sprite.pivotY * -1);

            if (sprite.imageType == "image") {

                ctx.drawImage(sprite.image, sprite.frameX, sprite.frameY, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);

            } else if (sprite.imageType == "draw") {

                sprite.draw(ctx);
            }
            ctx.restore();
        }
    }

    //メソッド
    this.appendSprite = function (sprite) {
        childs.push(sprite);
        sprite.system.deleted = false;
    }

    this.deleteSprite = function (sprite) {
        sprite.system.deleted = true;
    }

    this.appendCollider = function (c) {
        colliders.push(c);
    }

    this.deleteCollider = function (c) {
        c.system.deleted = true;
    }

    this.start = function (ms) {
        interval = setInterval(myUpdate, ms);
        coordinateSize = this.coordinateSize;
        userUpdate = this.update;
        backgroundColor = this.backgroundColor;
        userMouseUp = this.onmouseup;
        userMouseDown = this.onmousedown;
        userMouseMove = this.onmousemove;
    }

    this.stop = function () {
        clearInterval(interval);
    }
}


//レクトコライダ
function RectCollider(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.parent;
    this.group = "none";

    this.system = {
        type: "r",
        deleted: false
    }
}


//便利機能
function loadImg(src) {
    var img = document.createElement("img");
    img.src = src;
    img.style = "display: none";
    return img;
}

nowKey = new Array(0);

function keydown_event(e) {
    if (!nowKey.includes(e.key)) nowKey.push(e.key);
}
document.addEventListener("keydown", keydown_event);

function keyup_event(e) {
    if (nowKey.includes(e.key)) nowKey.splice(nowKey.indexOf(e.key), 1);
}
document.addEventListener("keyup", keyup_event);

Math.raToDe = function (ra) {
    return ra * 180 / Math.PI;
}

Math.deToRa = function (de) {
    return de * Math.PI / 180;
}

function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
    } else {
        return false;
    }
}