var samples=d3.json("samples.json").then(function(data) {
   var metadata =data.metadata;
   metadata.forEach(function(data){
    console.log(data)
    console.log(data.id)
    console.log(data.ethnicity)
    console.log(data.gender)
    console.log(data.age)
    console.log(data.location)
   });
  });

