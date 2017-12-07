function updateReportTable(id, building, room, issue, pictures){
    var innerText = "<tr><td>"+id+"</td><td>"+building+"</td><td>"+room+"</td></tr><tr><td colspan=3>"+issue+"</td>";
    for(i=0; i<pictures.length; i++) {
        if(i%3==0){
            innerText += "</tr><tr>";
        }
        innerText += "<td class='pic' value='imgs/"+pictures[i]+"'>Picture "+toString(i)+"</td>";
    }
    innerText += "</tr>";
    document.getElementById("reportTable").innerHTML = innerText;
}

function updateMap(lat, long, name){

      }
      $('#issueTable').on('click', '.issue', function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
      var jsonObj = $.parseJSON(this.responseText);
      if(jsonObj.latitude != 0 && jsonObj.longitude != 0){

      updateMap(jsonObj.latitude, jsonObj.longitude, toString(jsonObj.id));
      } else {
      updateMap(35.912061, -79.051228, "Old Well");
      }
      updateReportTable(jsonObj.id, jsonObj.building, jsonObj.room, jsonObj.issue);
      }};});
