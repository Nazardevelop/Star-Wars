var checkboxStates = {};
window.onload = function(){
    var checkBoxes = document.getElementsByClassName('checkbox');

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
getJSON("json/people.json",
    function(err, data) {
        //var p = document.getElementById('personagesList').innerHTML;
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
           var p = "<ul class='personages'>";
           var i = 1;
            data.results.forEach(function (elem) {
                p += "<li>" + elem.name + "<input type='checkbox' id='checkbox" + i
                    + "' class='checkbox' onclick='changeState(this.id)'>" + "</li> ";
                i++;
            });
            p += "</ul>";
        }
        document.getElementById('personagesList').innerHTML = p;
        console.log(p);
        console.log(checkBoxes);


        if(sessionStorage.getItem("checkBoxStates")){
            checkboxStates = JSON.parse(sessionStorage.getItem("checkBoxStates"));
            for (var key in checkboxStates){
                document.getElementById(key).checked = checkboxStates[key];
            }

        }
        else {

            for(var j = 0 ; j < checkBoxes.length; j++ ) {
                checkboxStates[checkBoxes[j].id] = checkBoxes[j].checked;
            }
            console.log(checkboxStates);
            sessionStorage.setItem("checkBoxStates", JSON.stringify(checkboxStates));
        }
    });

};
function changeState(id) {
    for (var key in checkboxStates){
        if (key == id ){
            checkboxStates[key] = !checkboxStates[key];
            sessionStorage.setItem("checkBoxStates", JSON.stringify(checkboxStates));
            console.log(checkboxStates);
        }
    }
}