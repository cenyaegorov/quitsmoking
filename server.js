var express = require('express');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/:url', function(req, res){
    res.sendFile(__dirname + '/' + req.params.url);
});
app.post('/make', urlencodedParser, function(req, res) {
    var text = req.body.story;
    for( var i = 0; i < 1000; i++) {
        if(!(text.indexOf('@') + 1)) break;
        text.splice(text.indexOf('@'), 1, '/20');
    }
    for(var i = 0; i < 1000; i++) {
        if(!(text.indexOf('&') + 1)) break;
        text.splice(text.indexOf('&'), 1, '/21');
    }
    var description = req.body.description;
    for( var i = 0; i < 1000; i++) {
        if(!(description.indexOf('@') + 1)) break;
        description.splice(description.indexOf('@'), 1, '/20');
    }
    for(var i = 0; i < 1000; i++) {
        if(!(description.indexOf('&') + 1)) break;
        description.splice(description.indexOf('&'), 1, '/21');
    }
    var name = req.body.name;
    var surname = req.body.surname;
    for( var i = 0; i < 1000; i++) {
        if(!(surname.indexOf('@') + 1)) break;
        surname.splice(surname.indexOf('@'), 1, '/20');
    }
    for(var i = 0; i < 1000; i++) {
        if(!(surname.indexOf('&') + 1)) break;
        surname.splice(surname.indexOf('&'), 1, '/21');
    }
    var file = req.body.file;
    for( var i = 0; i < 1000; i++) {
        if(!(file.indexOf('@') + 1)) break;
        file.splice(file.indexOf('@'), 1, '/20');
    }
    for(var i = 0; i < 1000; i++) {
        if(!(file.indexOf('&') + 1)) break;
        file.splice(file.indexOf('&'), 1, '/21');
    }
    var story = new Story(name, surname, file, description, text);
});
app.post('/popular', urlencodedParser, function(req, res) {
    console.log('getstoriespopular');
    if (req.body.max > popStories.length) req.body.max = popStories.length-1;
    var arr = popStories.slice(req.body.min, req.body.max+1);
    console.log(arr);
    var resault = [];
    console.log('for');
    for(var i = 0; i < arr.length; i++)
        resault[i] = [];
    console.log('forEach');
    arr.forEach(function(item, i) {
        console.log('reading');
        resault[i][0] = fs.readFileSync('images/' + item.i + '.png');
        resault[i][1] = fs.readFileSync('stories/' + item.i + '/description', 'utf-8');
        resault[i][2] = item.i;
        resault[i][3] = fs.readFileSync('stories/' + item.i + '/name', 'utf-8') + " " + fs.readFileSync('stories/' + item.i + '/surname');
        resault[i][4] = fs.readFileSync('stories/' + item.i + '/text', 'utf-8');
        console.log('readed');
    });
    res.send(stringify(resault));
    console.log('send');
});
app.post('/news', urlencodedParser, function(req, res) {
    console.log('getstoriesnew');
    if (req.body.max > newStories.length) req.body.max = newStories.length-1;
    var arr = newStories.slice(req.body.min, req.body.max+1);
    console.log(arr);
    var resault = [];
    console.log('for');
    for(var i = 0; i < arr.length; i++)
        resault[i] = [];
    console.log('forEach');
    arr.forEach(function(item, i) {
        console.log('reading');
        resault[i][0] = fs.readFileSync('images/' + item.i + '.png');
        resault[i][1] = fs.readFileSync('stories/' + item.i + '/description', 'utf-8');
        resault[i][2] = item.i;
        resault[i][3] = fs.readFileSync('stories/' + item.i + '/name', 'utf-8') + " " + fs.readFileSync('stories/' + item.i + '/surname');
        resault[i][4] = fs.readFileSync('stories/' + item.i + '/text', 'utf-8');
        console.log('readed');
    });
    res.send(stringify(resault));
    console.log('send');
});
app.post('/search', urlencodedParser, function(req, res) {
    var str = req.body.str;
    var searched = search(str.split(' '));
    if(req.body.max > searched.length) req.body.max = searched.length-1;
    var arr = searched.slice(req.body.min, req.body.max+1);
    var resault = [];
    console.log('for');
    for(var i = 0; i < arr.length; i++)
        resault[i] = [];
    console.log('forEach');
    arr.forEach(function(item, i) {
        console.log('reading');
        resault[i][0] = fs.readFileSync('images/' + item.i + '.png');
        resault[i][1] = fs.readFileSync('stories/' + item.i + '/description', 'utf-8');
        resault[i][2] = item.i;
        resault[i][3] = fs.readFileSync('stories/' + item.i + '/name', 'utf-8') + " " + fs.readFileSync('stories/' + item.i + '/surname');
        resault[i][4] = fs.readFileSync('stories/' + item.i + '/text', 'utf-8');
        console.log('readed');
    });
    res.send(stringify(resault));
    console.log('send');
});
app.post('/openstory', urlencodedParser, function(req, res) {
    fs.readFile(__dirname + '/stories/' + req.body.i + '/popular', 'utf-8', function(data) {
        fs.writeFile(__dirname + '/stories/' + req.body.i + '/popular', parseInt(data) + 1, function() {
            
        });
    });
});
http.listen(process.env.POST || 443);

setInterval(update, 1000);
var stories = [];
var newStories = [];
var popStories = [];

function stringify(arr) {
    var string;
    console.log('forEach');
    arr.forEach(function(item, i, arrr) {
        arr[i] = item.join('@');
    });
    string = arr.join('&');
    return string;
}

function update() {
    var pop = [];
    stories.forEach(function(item, i, arr) {
        try{
        var status = fs.readFileSync('stories/' + i + '/status', 'utf-8');
        if(status == "disactive") {
            fs.unlink('stories/' + item.i + '/status', function() {
                fs.unlink('stories/' + item.i + '/name', function() {
                    fs.unlink('stories/' + item.i + '/surname', function() {
                        fs.unlink('stories/' + item.i + '/description', function() {
                            fs.unlink('stories/' + item.i + '/text', function() {
                                fs.unlink('stories/' + item.i + '/keywords', function() {
                                    fs.unlink('images/' + item.i + '.png', function() {
                                        fs.unlink('stories/' + item.i + '/popular', function() {
                                            fs.rmdir('stories/' + item.i, function() {
                                                stories.splice(i-1, 1);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
        }catch(e) {
            
        }
        if(status == "active") {
            stories[i].popular = parseInt(fs.readFileSync('stories/' + item.i + '/popular', 'utf-8'));
            pop.push(stories[i].popular);
        }
    });
    popStories = populars(stories, pop);
}
function Story(name, surname, img, description, text) {
    if(stories[stories.length-1])
    var l = stories[stories.length-1].i+1;
    else
        var l = 0;
    var keywords;
    fs.mkdir('stories/' + l, function() {
        fs.writeFile('stories/' + l + '/status', 'active', function() {
            fs.writeFile('stories/' + l + '/name', name, function() {
                fs.writeFile('stories/' + l + '/surname', surname, function() {
                    fs.writeFile('stories/' + l + '/description', description, function() {
                        fs.writeFile('stories/' + l + '/text', text, function() {
                            var s = name + " " + surname + " " + description + " " + text;
                            s.toLocaleLowerCase();
                            keywords = s.split(', ').join(' ').split('"').join('').split("'").join('').split(' - ').join(' ').split(' ');
                            stor['keywords'] = keywords;
                            fs.writeFile('stories/' + l + '/keywords', keywords.join(' '), function() {
                                fs.writeFile('images/' + l + '.png', img, function() {
                                    fs.writeFile('stories/' + l + '/popular', 0, function() {
                                        stories[stories.length] = stor;
                                        newStories.unshift(stor);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    var stor = {};
    stor['name'] = name;
    stor['surname'] = surname;
    stor['description'] = description;
    stor['text'] = text;
    stor['popular'] = 0;
    stor['i'] = l;
}
function max(arr) {
    var max = arr[0];
    for(var i = 0; i < arr.length-1; i++) {
        if(arr[i] < arr[i+1])
            max = arr[i+1];
    }
    return max;
}
function populars(st, pop) {
    var arr = [];
    for(var i = 0; i < pop.length; i++) {
        var index = pop.indexOf(max(pop));
        pop[index] = 0;
        arr.push(st[index]);
    }
    return arr;
}
function search(words) {
    var search = [];
    for(var i = 0; i < words.length; i++) {
        search[i] = [];
    }
    stories.forEach(function(item, i) {
        var b = 0;
        for(var a = 0; a < words.length; a++) {
            if(item.keywords.indexOf(words[a]) + 1)
                b+=1;
        }
        if (!(search[b])) search[b] = [];
        search[b].push(item);
    });
    search.shift();
    search.reverse();
    search.forEach(function(item, i, sear) {
        var pop = [];
        item.forEach(function(it, index) {
            pop.push(it.popular);
        });
        search[i] = populars(item, pop);
    });
    var array = [];
    search.forEach(function(arr) {
        arr.forEach(function(item) {
            array.push(item);
        });
    });
    return array;
}
