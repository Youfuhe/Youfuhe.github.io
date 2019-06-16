const xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send(null);
xhr.onload = function () {
    let data = JSON.parse(xhr.responseText);
    data = data.result.records;
    // console.log(data.length);
    
    //選擇事件監聽
    const selectPart = document.getElementsByClassName("selectForm")
    for (let i = 0; i < selectPart.length; i++) {
        selectPart[i].addEventListener('change', function (e) {
            // console.log(e.target.value);
            let name = e.target.value; //選擇的行政名稱
            let filterData = []; //將有關此行政區塊的JSON存入
            for (let j = 0; j < data.length; j++) {
                if (name == data[j].Zone) {
                    filterData.push(data[j]);
                }
            }

            //頁碼設定
            // let nowData = filterData.splice(0,6);
            // let loadingData = filterData.splice(7, filterData.length);
            // console.log('nowData:'+nowData);
            // console.log('loadingData:'+loadingData);

            if (filterData == false) { //若行政區沒有旅遊資訊
                str = '';
                $('#about .title h1').html(name);
                $('#about .wrap').html(str);
            } else {
                showData(filterData);
            }
        });
    };

    //熱門行政區事件監聽
    const host = $('.wrap a li');
    for (let i = 0; i < host.length; i++) {
        host[i].addEventListener('click', function () {
            let name = this.innerHTML; //點選的行政名稱
            let filterData = []; //將有關此行政區塊的JSON存入
            // console.log(name);
            for (let j = 0; j < data.length; j++) {
                if (name == data[j].Zone) {
                    filterData.push(data[j]);
                }
            }
            // console.log(filterData);
            showData(filterData);
        });
    };
};



//回頂部
function gotop() {
    $(".goTop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
}

//在html上增加要讀取的資料和html程式碼
function showData(datas) {
    let str = '';
    for (let i = 0; i < datas.length; i++) {
        str += '<div class="item"><div class="backroungImg"><img src=' + datas[i].Picture1 + '><h1 class="name">' + datas[i].Name + '</h1><p class="zone">' + datas[i].Zone + '</p></div><div class="content"><p class="opentime "><img src="assets/icons_clock.png" alt="">' + datas[i].Opentime + '</p><p class="add "><img src="assets/icons_pin.png" alt="">' + datas[i].Add + '</p><p class="tel "><img src="assets/icons_phone.png" alt="">&nbsp' + datas[i].Tel + '</p><p class="ticketinfo "><img src="assets/icons_tag.png" alt="">' + datas[i].Ticketinfo + '</p></div></div>'
    };
    str += '<a class="goTop"></a>';
    $('#about .title h1').html(datas[0].Zone);
    $('#about .wrap').html(str);
    event.preventDefault();
    gotop();
};




