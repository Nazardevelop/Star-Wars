var getJSON = function (url,callback) {
    var  xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200){
           callback(null, xhr.response);
        }
        else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
getJSON('https://swapi.co/api/people/',
    function(err, data) {
        //var p = document.getElementById('personagesList').innerHTML;
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
           var p = "<ul>";
            data.results.forEach(function (elem) {
                p += "<li>" + elem.name + "</li> ";
            });
            p += "</ul>";
        }
        document.getElementById('personagesList').innerHTML = p;
        console.log(p);
    });