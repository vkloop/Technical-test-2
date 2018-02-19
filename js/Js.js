/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $*/

var username = document.getElementById("username_input").value;
var resultado = document.getElementById("git_hub");




function showhUsername(data) {

    var table_id = document.getElementById("table-body");
    var resultado = document.getElementById("git_hub");
    resultado.innerHTML = "";


    var div_image = document.createElement("img");
    div_image.setAttribute("src", data.avatar_url);
    div_image.setAttribute("class", "avatar");

    var fullname = document.createElement("h2");
    fullname.setAttribute("class", "full_name");
    fullname.append(data.name);

    var bio = document.createElement("p");
    bio.setAttribute("class", "bio");
    bio.append(data.bio);



    if (data.login != null) {

        resultado.append(data.login);
        resultado.append(div_image);


    }

    if (data.name != null) {
        resultado.append(fullname);
    }

    if (data.bio != null) {
        resultado.append(bio);
    }




}


function showData() {

    var username = document.getElementById("username_input").value;
    var resultado2 = document.getElementById("git_hub");
    resultado2.innerHTML = "";


    var request = new XMLHttpRequest();


    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.response);

            showhUsername(data);
            secondCall();



        } else if(request.readyState == 4 && request.status == 404){
            var table = document.getElementById("table-body");
            table.innerHTML = "";
            var doNotExtist = document.createElement("div");
            doNotExtist.innerHTML = "";
            doNotExtist.setAttribute("class", "alert-div");
            doNotExtist.style.display = "block";
            doNotExtist.innerHTML = '<p>' + "Does not exist" + '</p>';

            resultado2.append(doNotExtist);

            username.style.border = "darkcyan";


        }

    }
    request.open("GET", "https://api.github.com/users/" + username, true);

    request.send();



    function secondCall() {

        var request2 = new XMLHttpRequest();

        request2.open("GET", "https://api.github.com/users/" + username + "/repos", true);

        request2.onreadystatechange = callBack2;

        function callBack2() {
            if (request2.readyState == 4 && request2.status == 200) {

                var data2 = JSON.parse(request2.response);

                showAllRepo(data2);



            }

        }
        request2.send();

    }


}






var button = document.getElementById("button-input")
button.addEventListener("click", showData);


button.addEventListener("click", wipe);


function wipe() {

    document.getElementById("username_input").value = "";



}

function showAllRepo(data2) {




    var table = document.getElementById("table-body");
    table.innerHTML = "";

    var th = document.createElement("h3");
    th.setAttribute("class", "repository_title");
    th.innerHTML = "Repository"
    table.append(th);


    for (var i = 0; i < data2.length; i++) {

        var tr = document.createElement("tr");
        tr.setAttribute("class", "tr_line");


        var td1 = document.createElement("td");

        td1.innerHTML = data2[i].name;

        var td2 = document.createElement("td");

        td2.innerHTML = '<img src="images/2-filledstar.png">' + data2[i].stargazers_count;

        var td3 = document.createElement("td");
        var fork_img = document.createElement("img");
        fork_img.setAttribute("class", "imagen-fork");
        td3.innerHTML = '<img  src="images/fork.png">' + data2[i].forks_count;


        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        table.append(tr);


    }

}
