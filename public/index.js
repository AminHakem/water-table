$.ajax({
    url: "/cities",
    success: function( result ) {
        console.log(result)
    for(i=0; i < result.length; i++){    
      $( "tbody" ).append( `
      <tr>
        <th scope="row">`+(i+1)+`</th>
        <td>`+result[i].name+`</td>
        <td>`+result[i].latitude+`</td>
        <td>`+result[i].longitude+`</td>
        <td>`+result[i].usage+`</td>

      </tr>
      `)
    }
    $( "tbody" ).append( `
    <tr>
      <th scope="row">`+(result.length+1)+`
      </th>
      <form  id="form">
      <td><input name = "name"class = "form-control"></input></td>
      <td><input name = "latitude" type = "number"class = "form-control"></input></td>
      <td><input name = "longitude" type = "number" class = "form-control"></input></td>
      <td><input name = "usage" type = "number" class = "form-control"></input></td>
      </form
    </tr>
   
    `)
}
  });


function postData(){
var data = $("input")
console.log(data)
const body = {name:data[0].value,latitude:data[1].value,longitude:data[2].value,usage:data[3].value}
console.log(body)
 $.ajax({
        url: "/cities",
        type: "POST", 
        data : body,

        success: function( result ) {
            console.log(result)
            location.reload();
        },
        error: function(err){
          alert("Invalid Input")
        }})

console.log(data)
}