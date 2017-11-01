/*this variable if for checking and editing checkboxes states.IT is global because it is easier to find mistakes and
* project is small with one .js script, so we wil not have global name conflicts. If you do not want it to be global,
 * replace it in window.onload, BUT then you will need to replace function changeState too
* */
var checkboxStates = {};
window.onload = function(){
/*call function AJAX in window.onload, because we want our function to be executed when the page loads and to know
 * what is persanagelist */
getJSON("json/people.json",
    function(err, data) {
        //var p = document.getElementById('personagesList').innerHTML;
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            /*var p to create HTML code which will be injected to personagelist div*/
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
        /*here we get HTML collection of checkboxes*/
        var checkBoxes = document.getElementsByClassName('checkbox');
        console.log(p);
        console.log(checkBoxes);

/*if we have checkbox states data in session storage we write it in to checkboxStates variable, and give state from
*that data to every checkbox */
        if(sessionStorage.getItem("checkBoxStates")){
            checkboxStates = JSON.parse(sessionStorage.getItem("checkBoxStates"));
            for (var key in checkboxStates){
                document.getElementById(key).checked = checkboxStates[key];
            }

        }
        /*if we have no info about checkbox states, we fill our checkboxStates object with it, where key is checkbox id
        * and value is state. Then we put checkboxStates info to session storage*/
        else {

            for(var j = 0 ; j < checkBoxes.length; j++ ) {
                checkboxStates[checkBoxes[j].id] = checkBoxes[j].checked;
            }
            console.log(checkboxStates);
            sessionStorage.setItem("checkBoxStates", JSON.stringify(checkboxStates));
        }
    });

};
/* function for AJAX request*/
 function getJSON (url,callback) {
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
 /*function for listen the change of checkbox state. If the state is changed it will rewrite info about that checkbox in
 * checkboxStates and in session storage*/
function changeState(id) {
    for (var key in checkboxStates){
        if (key == id ){
            checkboxStates[key] = !checkboxStates[key];
            sessionStorage.setItem("checkBoxStates", JSON.stringify(checkboxStates));
            console.log(checkboxStates);
        }
    }
}