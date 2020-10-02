// id list
//var names=["940", "941", "943", "944", "945", "946", "947", "948", "949", "950", "952", "953", "954", "955", "956", "958", "959", "960", "961", "962", "963", "964", "966", "967", "968", "969", "970", "971", "972", "973", "974", "975", "978", "1233", "1234", "1235", "1236", "1237", "1238", "1242", "1243", "1246", "1253", "1254", "1258", "1259", "1260", "1264", "1265", "1273", "1275", "1276", "1277", "1278", "1279", "1280", "1281", "1282", "1283", "1284", "1285", "1286", "1287", "1288", "1289", "1290", "1291", "1292", "1293", "1294", "1295", "1296", "1297", "1298", "1308", "1309", "1310", "1374", "1415", "1439", "1441", "1443", "1486", "1487", "1489", "1490", "1491", "1494", "1495", "1497", "1499", "1500", "1501", "1502", "1503", "1504", "1505", "1506", "1507", "1508", "1510", "1511", "1512", "1513", "1514", "1515", "1516", "1517", "1518", "1519", "1521", "1524", "1526", "1527", "1530", "1531", "1532", "1533", "1534", "1535", "1536", "1537", "1539", "1540", "1541", "1542", "1543", "1544", "1545", "1546", "1547", "1548", "1549", "1550", "1551", "1552", "1553", "1554", "1555", "1556", "1557", "1558", "1561", "1562", "1563", "1564", "1572", "1573", "1574", "1576", "1577", "1581", "1601"];
d3.json("samples.json").then(function(data) {
    var names=data.names;
    // dropdown list position
    var dropDownList = d3.select('#selDataset');
    //
    names.forEach(function(name){
        dropDownList.append('option')
            .text(name)
            .attr('value',name);
    //console.log(names);
    });
});






//----event handler
d3.select('#selDataset').on('change',getDropDownValue);

function getDropDownValue(){
    var selectedDropDownValue = parseInt(d3.select('#selDataset').node().value);
    console.log(`Drop Down Value is ${selectedDropDownValue}`);

    d3.json("samples.json").then(function(data) {
        var sampleData =data.samples;
        var metaData = data.metadata;


        metaData.forEach(function(data){
            var metaDataId = parseInt(data.id)
            if (metaDataId===selectedDropDownValue){
                // console.log('info matched')
                var metaEthnicity = data.ethnicity
                // console.log(metaEthnicity)
                var metaGender = data.gender
                // console.log(metaGender)
                var metaLocation = data.location
                // console.log(metaLocation)
                var metaBbtype = data.bbtype
                // console.log(metaBbtype)
                var metaWfreq = data.wfreq
                // console.log(metaWfreq)

                //----- info section
                var infoSection = d3.select('#sample-metadata');
                infoSection.html("");
                Object.entries(data).forEach(([key,value])=>{
                    var temp =`${key}: ${value}`
                    infoSection.append('h5')
                        .text(temp)
                    console.log(temp)
                });
                // infoSection.append('h5')
                //     .text(`id: ${metaDataId}`)
                // infoSection.append('h5')
                //     .text(`ethnicity: ${metaEthnicity}`)
                // infoSection.append('h5')
                //     .text(`gender: ${metaGender}`)
                // infoSection.append('h5')
                //     .text(`location: ${metaLocation}`)
                // infoSection.append('h5')
                //     .text(`bbtype: ${metaBbtype}`)
                // infoSection.append('h5')
                //     .text(`wfreq: ${metaWfreq}`)
                //----- info section finish

                
                //-----challenge section
                console.log(metaWfreq);
                var data = [
                    {
                        domain: { x: [0, 1], y: [0, 1] },
                        value: metaWfreq,
                        title: { text: "Belly Button Washing Frequency" },
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: {
                            axis: { range: [null, 9]},
                            //labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                            steps: [
                                { range: [0, 1], color: "#ffffe0" },
                                { range: [1, 2], color: "#c5eddf" },
                                { range: [2,3], color: "#a5d5d8"  },
                                { range: [3, 4], color: "#8abccf" },
                                { range: [4, 5], color: "#73a2c6" },
                                { range: [5, 6], color: "#5d8abd" },
                                { range: [6, 7], color: "#4771b2" },
                                { range: [7, 8], color: "#2e59a8" },
                                { range: [8, 9], color: "#00429d" }
                              ],}
                    }
                ];
                
                var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
                Plotly.newPlot('gauge', data, layout);

                //-----challenge section finish


            }
        })

       sampleData.forEach(function(data){
        // console.log(data)

            var sampleId = parseInt(data.id)
            if (sampleId ===selectedDropDownValue){
                // console.log('bar matched')
                // console.log(sampleId)
                var sampleValues = data.sample_values.slice(0, 10)
                //console.log(sampleValues)
                var sampleOtuIds = data.otu_ids.slice(0, 10).map(id=>`OTU ${id}`)
                //console.log(sampleOtuIds)
                var sampleLabels = data.otu_labels.slice(0, 10)
                //console.log(sampleLabels)



                //-----bar chart section
                var trace1={
                    x:sampleValues,
                    y:sampleOtuIds,
                    type:'bar',
                    orientation: 'h',
                    //sort by xaxis value
                    transforms: [{
                        type: 'sort',
                        target: 'x',
                        order: 'asceding'
                    }]

                }
                var layout1={
                    xaxis:{title:'Sample Values'},
                    yaxis:{title:'otu_id'},
                
                }
                var data1=[trace1]
                Plotly.newPlot("bar", data1,layout1);
                //-----bar cahrt section finish


                //-----bubble chart section
                // console.log('bubble chart match')
                var sampleOtuIds_bubble = data.otu_ids
                var sampleValues_bubble = data.sample_values
                console.log(sampleOtuIds_bubble)
                console.log(sampleValues_bubble)
                var trace2={
                    x:sampleOtuIds_bubble,
                    y:sampleValues_bubble,
                    mode:'markers',
                    marker:{
                        size:sampleValues_bubble,
                        color:sampleOtuIds_bubble,
                    },
                    text:sampleLabels
                }
                var data2=[trace2]
                var layout2={
                    xaxis:{title:'OTU ID'}
                }

                Plotly.newPlot('bubble',data2,layout2)
                //-----bubble chart section finish

            }
        
        });
    });



}


//


