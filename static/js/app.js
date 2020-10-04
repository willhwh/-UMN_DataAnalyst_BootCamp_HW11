// load id list
d3.json("samples.json").then(function(data) {
    var names=data.names;
    // dropdown list position
    var dropDownList = d3.select('#selDataset');
    //create dropdown list
    names.forEach(name=>{
        dropDownList.append('option')
            .text(name)
            .attr('value',name);
    //console.log(names);
    });
});






//----event handler for changing on index filter
d3.select('#selDataset').on('change',getDropDownValue);

function getDropDownValue(){
    //dropdown list value
    var selectedDropDownValue = parseInt(d3.select('#selDataset').node().value);
    console.log(`Drop Down Value is ${selectedDropDownValue}`);

    d3.json("samples.json").then(function(data) {
        //create data variable
        var sampleData =data.samples;
        var metaData = data.metadata;


        metaData.forEach(function(data){
            var metaDataId = parseInt(data.id)
            //if matched
            if (metaDataId===selectedDropDownValue){
                // console.log('info matched')
                var metaWfreq = data.wfreq;
                // console.log(metaWfreq)

                //----- info section
                var infoSection = d3.select('#sample-metadata');
                //clean the previous data for info section
                infoSection.html("");
                //present key and value for information
                Object.entries(data).forEach(([key,value])=>{
                    var temp =`${key}: ${value}`;
                    infoSection.append('h5').text(temp);
                    //console.log(temp)
                });//----- info section finish

                
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
                            //min and max value
                            axis: { range: [null, 9]},
                            //sections for each threshold
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
                            ]
                        }
                    }
                ];

                var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
                Plotly.newPlot('gauge', data, layout);

                //-----challenge section finish
            };
        });
       sampleData.forEach(function(data){
        // console.log(data)
            var sampleId = parseInt(data.id);
            //if matched get first 10 results
            if (sampleId ===selectedDropDownValue){
                // console.log('bar matched')
                // console.log(sampleId)
                var sampleValues = data.sample_values.slice(0, 10);
                //console.log(sampleValues)
                var sampleOtuIds = data.otu_ids.slice(0, 10).map(id=>`OTU ${id}`);
                //console.log(sampleOtuIds)
                var sampleLabels = data.otu_labels.slice(0, 10);
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
                    }]};
                var layout1={
                    xaxis:{title:'Sample Values'},
                    yaxis:{title:'otu_id'}
                };

                var data1=[trace1];
                Plotly.newPlot("bar", data1,layout1);
                //-----bar cahrt section finish


                //-----bubble chart section
                // console.log('bubble chart match')
                var sampleOtuIds_bubble = data.otu_ids;
                var sampleValues_bubble = data.sample_values;
                //console.log(sampleOtuIds_bubble);
                //console.log(sampleValues_bubble);
                var trace2={
                    x:sampleOtuIds_bubble,
                    y:sampleValues_bubble,
                    mode:'markers',
                    marker:{
                        //size
                        size:sampleValues_bubble,
                        //color
                        color:sampleOtuIds_bubble
                    },
                    //label for each data point
                    text:sampleLabels};
                var data2=[trace2];
                var layout2={
                    xaxis:{title:'OTU ID'}};

                Plotly.newPlot('bubble',data2,layout2);
                //-----bubble chart section finish
            };
        });
    })
};

