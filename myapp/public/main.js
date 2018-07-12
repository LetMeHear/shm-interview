var datas = [];
var data = {};
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/", true);
    xhr.onreadystatechange = function() {
        datas = xhr.responseText;
    }
    xhr.send(null);
}
getData();

var btn = document.getElementById("selectionBtn");
var parent = document.getElementById("selectionParent");
var stString = ""; //声明了一个全局变量保存选择的字符串

function handleChoose() { //选择城市按钮处理事件

    data = JSON.parse(datas);
    stString = "";
    parent.innerHTML = "";
    location.hash = "chooseProvince";

    var handler = function(index) {
        var subDiv = document.createElement("div");
        subDiv.className = "subDiv";
        parent.appendChild(subDiv);
        subDiv.innerHTML = data[index].name;
        setTimeout(() => {
            subDiv.className += " subDivr";
        }, 100);
    }
    for (var i = 0; i < data.length; i++) {
        handler(i);
    }
    var cityDiv = document.getElementsByClassName("subDiv");
    var handleClickSub = function(index) { //城市选项按钮处理事件
        event.stopPropagation();
        cityDiv[index].onclick = function() {
            stString += cityDiv[index].innerHTML;
            parent.innerHTML = "";
            location.hash = "chooseCity";

            var subHandler = function(inde) {
                var subDivs = document.createElement("div");
                parent.appendChild(subDivs);
                subDivs.className = "subDivs";
                subDivs.innerHTML = data[index].city[inde].name;
                setTimeout(() => {
                    subDivs.className += " subDivsr";
                }, 100);
                //处理选择什么区县
                var districtDiv = document.getElementsByClassName("subDivs");

                for (var i = 0; i < districtDiv.length; i++) {
                    handleClickDis(i);
                }

                function handleClickDis(index1) {
                    districtDiv[index1].onclick = function() {
                        stString += "-" + districtDiv[index1].innerHTML;
                        parent.innerHTML = "";
                        location.hash = "chooseDistrict";

                        for (var i = 0; i < data[index].city[inde].district.length; i++) {
                            disHandler(i);
                        }
                        function disHandler(index2) {
                            var disDivs = document.createElement("div");
                            parent.appendChild(disDivs);
                            disDivs.className = "disDivs";
                            disDivs.innerHTML = data[index].city[index1].district[index2];
                            setTimeout(() => {
                                disDivs.className += " disDivsr";
                            }, 100);

                            //处理最里层点击事件
                            var innestDiv = document.getElementsByClassName("disDivs");

                            for (var i = 0; i < innestDiv.length; i++) {
                                handleClickInn(i);
                            }
                            function handleClickInn(index3) {
                                innestDiv[index3].onclick = function() {
                                    stString += "-" + innestDiv[index3].innerHTML;
                                    parent.innerHTML = "";
                                    parent.appendChild(btn);
                                    var divText = document.createElement("p");
                                    divText.innerHTML = "所选城市：" + stString;
                                    parent.appendChild(divText);
                                    location.hash = "";
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < data[index].city.length; i++) {
                subHandler(i);
            }
        }
    }
    for (var i = 0; i < cityDiv.length; i++) {
        handleClickSub(i);
    }
}

