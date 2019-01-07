document.body.style.display = "block";
var one = document.querySelector(".one");
var vred = document.querySelector(".vred");
var mainImage = document.body.firstChild;
var rak = document.querySelector(".rak");
var rak_text = document.querySelector(".rak .text");
var nikotin = document.querySelector(".nikotin");
var nikotin_text = document.querySelector(".nikotin .text");
var gazi = document.querySelector(".gazi");
var gazi_text = document.querySelector(".gazi .text");
var s = true;
var symptoms = document.querySelector(".symptoms");
var overhidden = document.querySelectorAll(".overhidden");
var bros = document.querySelector(".bros");
var tabak = document.querySelector(".tabak");
var pop = document.querySelector('.pop');
var news = document.querySelector('.new');
var popS = document.querySelector('.pop_stories');
var newS = document.querySelector('.new_stories');
var textS = document.querySelector('.text_stories');
var searchS = document.querySelector('.search_stories');
var search = document.querySelector('.search');
var searchW = document.querySelector('form input[type="search"]');
var makeS = document.querySelector('.make_stories');
var make = document.querySelector('.make');
var story = document.getElementById('story');
var description = document.getElementById('description');
var name = document.getElementById('names');
var surname = document.getElementById('surname');
var fileI = document.getElementById('file');
var create = document.querySelector('.create');
searchS.min = 0;
searchS.max = 10;
searchS.end = true;
search.addEventListener('click', function() {
    searchS.min = 0;
    searchS.max = 10;
    searchS.innerHTML = "";
    popS.style.display = 'none';
    newS.style.display = 'none';
    textS.style.display = 'none';
    makeS.style.display = 'none';
    searchS.style.display = "block";
    var body = "str=" + encodeURIComponent(searchW.value) + "&min=0&max=10";
    var self = searchS;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/search', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if(this.readyState != 4) return;
        this.responseText = decode(this.responseText);
        var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                searchS.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var story = document.createElement('div');
                story.classList.add('story');
                story.index = item[2];
                story.texte = item[4];
                story.image = item[0];
                story.author = item[3];
                story.onclick = openS;
                story.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(story);
            });
    }
    xhr.send(body);
});
searchS.onscroll = function() {
    this.max += 10;
    this.min += 10;
    if(this.scrollTop >= ((this.children.length - 3) * this.children[0].clientHeight) && this.end) {
        var body = 'min=' + this.min + '&max=' + this.max + "&str=" + encodeURIComponent(searchW.value);
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/search', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
        if(this.readyState != 4) return;
        this.responseText = decode(this.responseText);
        var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                self.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var story = document.createElement('div');
                story.classList.add('story');
                story.index = item[2];
                story.texte = item[4];
                story.image = item[0];
                story.author = item[3];
                story.onclick = openS;
                story.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(story);
            });
    }
        
    xhr.send(body);
    }
};
popS.min = newS.min = 0;
popS.max = newS.max = 10;
popS.end = newS.end = true;
popS.onscroll = popScroll;
newS.onscroll = popScroll;
popS.popScroll = function() {
    var body = 'min=' + this.min + '&max=' + this.max;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/popular', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(e) {
            if(this.readyState != 4) return;
            this.responseText = decode(this.responseText);
            var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                self.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var story = document.createElement('div');
                story.classList.add('story');
                story.index = item[2];
                story.texte = item[4];
                story.image = item[0];
                story.author = item[3];
                story.onclick = openS;
                story.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(story);
            });
            newS.popScroll();
        };
        xhr.send(body);
        this.min += 10;
        this.max += 10;
};
newS.popScroll = function() {
    var body = 'min=' + this.min + '&max=' + this.max;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/news', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(e) {
            if(this.readyState != 4) return;
            this.responseText = decode(this.responseText);
            var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                self.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var div = document.createElement('div');
                div.classList.add('story');
                div.index = item[2];
                div.texte = item[4];
                div.image = item[0];
                div.author = item[3];
                div.onclick = openS;
                div.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(div);
            });
        };
        xhr.send(body);
        this.min += 10;
        this.max += 10;
};
popS.popScroll();
create.addEventListener('click', function() {
    if(story.value && description.value && surname.value && fileI.files[0]) {
        var file = fileI.files[0];
        var reader = new FileReader();
        reader.onload = function() {
        var params = "story=" + encodeURIComponent(story.value) + "&description=" + encodeURIComponent(description.value) + "&name=" + encodeURIComponent(name.value) + "&surname=" + encodeURIComponent(surname.value) + "&file=" + encodeURIComponent(reader.result);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/make", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
        };
        reader.readAsDataURL(file);
        this.style.display = 'none';
    }
});
make.addEventListener('click', function() {
    popS.style.display = 'none';
    newS.style.display = 'none';
    textS.style.display = 'none';
    searchS.style.display = 'none';
    makeS.style.display = "block";
});
pop.onclick = function() {
    pop.style.backgroundColor = 'orange';
    news.style.backgroundColor = "darkorange";
    popS.style.display = "block";
    newS.style.display = 'none';
    textS.style.display = 'none';
    searchS.style.display = 'none';
    makeS.style.display = 'none';
};
news.onclick = function() {
    news.style.backgroundColor = 'orange';
    pop.style.backgroundColor = "darkorange";
    popS.style.display = 'none';
    newS.style.display = "block";
    textS.style.display = 'none';
    searchS.style.display = 'none';
    makeS.style.display = 'none';
};
tabak.onclick = openTabak;
document.querySelectorAll('.button').forEach(function(item) {
    item.onmousedown = function() {
        this.style.backgroundColor = 'gold';
    };
    item.onmouseup = function() {
        this.style.backgroundColor = 'cornflowerblue';
    };
    item.onmouseover = function() {
        this.parentElement.children[[].indexOf.call(this.parentElement.children, item)].cssText = 'border: 1px solid cornflowerblue;  transform: scale(1.5); transition: transform .5s;';};
});
overhidden.forEach(function(item, i, arr) {
    item.a = false;
    var arr = document.body.getElementsByTagName("div");
    for (var i = 0; i < arr.length; i++){
            if(arr[i] == item){
                var index = i;
            }
        }
    item.nh = arr[index + 2].clientHeight;
    item.onclick = function(e) {
        var maxValue = Math.max(this.clientWidth, this.clientHeight);
        var circle = document.createElement("div");
        circle.height = circle.width = maxValue;
        circle.style.left = e.clientX + window.pageXOffset + "px";
        circle.style.top = e.clientY + window.pageYOffset+ "px";
        circle.classList.add("cir");
        item.appendChild(circle);
        setTimeout(function() {item.removeChild(circle);}, 800)
        offOn(item);
    };
});

window.onscroll = function() {
    var scrollHeight = window.pageYOffset;
    if (scrollHeight < mainImage.clientHeight && scrollHeight > 100) {
        var v = mainImage.clientHeight / 50;
        for (var i = 0; i < Math.floor(mainImage.clientHeight / 10); i++) {
            setTimeout(function() {
               scrollBy(0, v);
            }, i * 10);
        }
        b = false;
        one.style.color = "red";
    }
    if (scrollHeight >= mainImage.clientHeight / 2) {
        rak.style.opacity = "1";
        rak.style.marginLeft = "0px";
        rak_text.style.opacity = "1";
        rak_text.style.marginLeft = "0px";
        rak_text.style.marginRight="5%"
    }
    if (scrollHeight >= mainImage.clientHeight) {
        nikotin.style.opacity = "1";
        nikotin.style.marginLeft = "0px";
        nikotin_text.style.opacity = "1";
        nikotin_text.style.marginLeft = "5%";
    }
    if (scrollHeight >= rak.clientHeight / 2 + mainImage.clientHeight) {
        gazi.style.opacity = "1";
        gazi.style.marginLeft = "0px";
        gazi_text.style.opacity = "1";
        gazi_text.style.marginLeft = "0px";
        gazi_text.style.marginRight="5%";
    }
    if (scrollHeight >= (mainImage.clientHeight + vred.clientHeight * 1.2) && s) {
        symptoms.style.opacity = "1";
        symptoms.style.transform = "scale(1)";
        setTimeout(function() {
            symptoms.style.color = "black";
            symptoms.style.backgroundColor = "white";
        }, 1000)
    }
    if (scrollHeight >= (mainImage.clientHeight + vred.clientHeight + symptoms.clientHeight * 1.2)) {
        bros.style.opacity = "1";
        bros.style.marginTop = "0px";
    }
}
function offOn(item) {
    var arr = document.body.getElementsByTagName("div");
    var vis = item.getElementsByClassName("vis")[0];
    var hid = item.getElementsByClassName("hid")[0];
    var text = item.getElementsByClassName("text")[0];
    for (var i = 0; i < arr.length; i++){
            if(arr[i] == item){
                var index = i;
            }
        }
    if (item.a) {
        item.a = false;
        arr[index+3].style.height = item.nh + "px";
        arr[index + 3].style.overflow = "hidden";
        text.style.opacity = "0";
        vis.style.marginLeft = "48%";
        hid.style.marginLeft = "48%";
        hid.style.transition = vis.style.transition = "margin-left 1.5s";
        setTimeout(function() {
            vis.style.display = "none";
            hid.style.display = "block";
        }, 1500);
        item.style.backgroundColor = "#e8e7e7";
    }
    else {
        item.a = true;
        vis.style.marginLeft = "1%";
        hid.style.marginLeft = "1%";
        hid.style.transition = vis.style.transition = "margin-left 1.5s";
        setTimeout(function() {
            vis.style.display = "block";
            hid.style.display = "none";
            text.style.opacity = "1";
        }, 1300);
        item.style.backgroundColor = "#bdbdbd";
        arr[index + 3].style.height = "0px";
        arr[index + 3].style.overflow = "hidden";
    }
}
function openTabak(e){
    document.body.style.overflow = "hidden";
    var dis  = document.createElement("div");
    dis.style.position = "fixed";
    dis.style.left = dis.style.top = "0px";
    dis.style.width = "100%";
    dis.style.height = "100%";
    dis.style.opacity = ".5";
    dis.style.backgroundColor = "black";
    document.body.children[0].appendChild(dis);
    var menu = document.createElement("div");
    menu.style.position = "fixed";
    menu.style.left = menu.style.top = "0px";
    menu.style.zIndex = "1";
    menu.style.height = "10%";
    menu.style.width = "100%";
    menu.innerHTML = '<div class="bg" style="float: right; margin-right: 2%; height:100%; background-color: white;"><img src="icons8-delete-50.png" height="100%"></div>';
    menu.querySelector(".bg").style.transition = ".3s";
    menu.querySelector(".bg").onmouseover = function(){
        menu.querySelector(".bg").style.backgroundColor = "#0a0a0a";
    };
    menu.querySelector(".bg").onmouseout = function() {
        menu.querySelector(".bg").style.backgroundColor = "white";
    };
    menu.querySelector(".bg").onclick = function() {
        document.body.children[0].removeChild(menu);
        document.body.children[0].removeChild(iframe);
        document.body.children[0].removeChild(dis);
        document.body.style.overflow = "visible";
    }
    menu.style.backgroundColor = "white";
    var loading = document.createElement("img");
    loading.style.position = "fixed";
    loading.style.left = "45%";
    loading.style.top = "40%";
    loading.style.width = "10%";
    loading.src = "807.gif";
    loading.style.zIndex="1";
    var iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "0px";
    iframe.style.top = "10%";
    iframe.style.width = "100%";
    iframe.style.height = "90%";
    iframe.style.zIndex = "1";
    iframe.style.opacity = 0;
    iframe.style.transition = ".5s ease-out";
    document.body.children[0].appendChild(iframe);
    iframe.src = "tabak.html";
    iframe.onload = function(){
        setTimeout(function() {
        document.body.children[0].removeChild(loading);
        iframe.style.opacity = "1";
        }, 8000);
    }
    document.body.children[0].appendChild(loading);
    document.body.children[0].appendChild(menu);
}
function popScroll() {
    if(this.scrollTop >= ((this.children.length - 3) * this.children[0].clientHeight) && this.end) {
        var body = 'min=' + this.min + '&max=' + this.max;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/popular', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(e) {
            if(this.readyState != 4) return;
            this.responseText = decode(this.responseText);
            var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                self.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var div = document.createElement('div');
                div.classList.add('story');
                div.index = item[2];
                div.texte = item[4];
                div.image = item[0];
                div.author = item[3];
                div.onclick = openS;
                div.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(div);
            });
        };
        xhr.send(body);
        this.min += 10;
        this.max += 10;
    }
}
function newScroll() {
    if(this.scrollTop >= ((this.children.length - 3) * this.children[0].clientHeight) && this.end) {
        var body = 'min=' + this.min + '&max=' + this.max;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/news', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(e) {
            if(this.readyState != 4) return;
            this.responseText = decode(this.responseText);
            var histories = this.responseText.split('&');
            for(var i = 0; i < histories.length; i++) {
                histories[i] = histories[i].split('@');
            }
            if(histories.length < 10) {
                self.end = false;
            }
            histories.forEach(function(item, i, arr) {
                var div = document.createElement('div');
                div.classList.add('story');
                div.index = item[2];
                div.texte = item[4];
                div.image = item[0];
                div.author = item[3];
                div.onclick = openS;
                div.innerHTML = '<div class="nasu"><img height="100%" src="' + item[0] + '"> ' + item[3] + '</div><div class="des">' + item[1] + '</div>';
                self.appendChild(div);
            });
        };
        xhr.send(body);
        this.min += 10;
        this.max += 10;
    }
}
function decode(str) {
    for(var i = 0; i < 1000; i++) {
        if(!(str.indexOf('/20')+1)) break;
        str.splice(str.indexOf('/20'), 3, '@');
    }
    for(var i = 0; i < 1000; i++) {
        if(!(str.indexOf('/21')+1)) break;
        str.splice(str.indexOf('/21'), 3, '&');
    }
    return str;
}
function openS() {
    popS.style.display = 'none';
    newS.style.display = 'none';
    makeS.style.display = 'none';
    searchS.style.display = 'none';
    textS.style.display = 'block';
    textS.innerHTML = '<div class="nasu"><img height="100%" src="' + this.image + '"> ' + this.author + '</div><div class="story-texte">' + this.texte + '</div>';
}