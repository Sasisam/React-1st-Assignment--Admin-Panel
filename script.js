var url = 'http://127.0.0.1:5500/JS React.json';
 var http=new XMLHttpRequest();
 http.open('GET',url,true);
 http.send();
 http.onload=function()
 {
    if(this.readyState==4 &&this.status==200)
    {

        var res=http.responseText
        console.log(res);
        var o=JSON.parse(res)
    
    console.log(o.length);

    var data="";
    for(var i=0;i<o.length;i++)
    {
        data+=`
        <table>\
        <tbody>\
        <tr class="data-row" id="data-row">
        <td class="column1">${o[i].id}</td>
        <td class="column2">${o[i].firstName}</td>
        <td class="column3">${o[i].lastName}</td>
        <td class="column4">${o[i].email}</td>
        <td class="column5">${o[i].phone}</td>
    </tr>
    </tbody>
                    </table>
        
     `

    }
  document.getElementById('table-data').innerHTML=data;
  var trows = document.getElementsByClassName("data-row");
  var infocontent = document.getElementById("info-content");
  var details = document.querySelectorAll("#info-content > div");
  var content = document.createElement("div");
  var prev;
  for (var k = 0; k < trows.length; k++) {
    trows[k].addEventListener("click", function (e)
    {
        if (prev != undefined) {
            prev.classList.remove("active");
          } this.classList.add("active");
          infocontent.style.display = "block";
          prev = this;
          //program to displaying on right side
       for (var j = 0; j < o.length; j++) 
       {
        if (this.childNodes[1].innerHTML == o[j].id) {
        var detname = document.getElementById("name");
            var state = document.getElementById("state");
            var zip = document.getElementById("zip");
            var address = document.getElementById("address");
            var city = document.getElementById("city");
            var desc = document.getElementById("desc");
            detname.innerHTML= o[j].firstName + " " + o[j].lastName;
            state.innerHTML = o[j].address.state;
            zip.innerHTML = o[j].address.zip;
            address.innerHTML = o[j].address.streetAddress;
            city.innerHTML = o[j].address.city;
            desc.innerHTML = o[j].description;
            content.style.display = "block";

          }
       }

          });
       }
      let searchbox=document.getElementById("search-box")
  //search box functionality
  searchbox.addEventListener("keyup", function () {
    
    let textToSearch = searchbox.value;
    let paragraph = document.getElementById("table-data");
    console.log("keyup");
   for (var i = 0; i < trows.length; i++) {
      var fname = trows[i].innerHTML.toUpperCase();
      if (fname.indexOf(textToSearch.toUpperCase())!=-1) {
        trows[i].style.display = "block";
      } else {
        trows[i].style.display = "none";
      }
    }
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

    let pattern = new RegExp(`${textToSearch}`,"gi");

    paragraph.innerHTML = paragraph.textContent.highlight(pattern, match => ` <mark><table>
    <tbody>
    <tr class="data-row" id="data-row"><td>${match}</td></tr></tbody></table></mark>`)
    
    
});
  }
};