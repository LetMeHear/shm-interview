var datas = [];
var data = {};

var status = 0; //页面是否点击过选择城市等，判断是否能进行回退
function getData() { //获取data
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

setTimeout(() => {
    btn.className += " chooseBtnr";
}, 100);

function handleChoose() { //选择城市按钮处理事件

    status = 1;

    btn.className = "choose-city-button";
    data = JSON.parse(datas);
    stString = "";
    parent.innerHTML = "";
    // location.hash = "chooseProvince";
    pushHistory("", "#chooseProvince");

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

            status = 1;
            stString += cityDiv[index].innerHTML;
            parent.innerHTML = "";
            // location.hash = "chooseCity";
            pushHistory("", "#chooseCity");

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

                        status = 1;
                        stString += "-" + districtDiv[index1].innerHTML;
                        parent.innerHTML = "";
                        // location.hash = "chooseDistrict";
                        pushHistory("", "#chooseDistrict");

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

                            //处理最里层点击事件,选择街道，显示所选择的地区
                            var innestDiv = document.getElementsByClassName("disDivs");

                            for (var i = 0; i < innestDiv.length; i++) {
                                handleClickInn(i);
                            }
                            function handleClickInn(index3) {
                                innestDiv[index3].onclick = function() {

                                    status = 0; //控制不要移除所选择的城市
                                    stString += "-" + innestDiv[index3].innerHTML;
                                    parent.innerHTML = "";
                                    parent.appendChild(btn);
                                    var divText = document.createElement("p");
                                    divText.innerHTML = "所选城市：" + stString;
                                    divText.className = "forChange";
                                    parent.appendChild(divText);
                                    location.hash = "";
                                    setTimeout(() => {
                                        btn.className += " chooseBtnr";
                                        divText.className += " forChanger";
                                    }, 100);
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

window.addEventListener("popstate", function() {
    var divs = document.getElementsByTagName("div");
    if (status == 1) {
        status = 0;
        for (var i = 1; i <= divs.length; i++) {
            handleRemove(i);
        }
        function handleRemove() {
            parent.innerHTML = "";
        }
        parent.appendChild(btn);
        if (btn.className == "choose-city-button") {
            setTimeout(() => {
                btn.className += " chooseBtnr";
            }, 100);
            location.hash = "";
        }
    }
});

function pushHistory(title, url) {
    var state = {
        title: title,
        url: url
    }
    window.history.pushState(state, title, url);
}