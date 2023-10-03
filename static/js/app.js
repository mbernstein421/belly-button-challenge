//Use sample_values as the values for the bar chart.

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.


function bar(values, ids, labels) {
    const data = [{
        x: values,
        y: ids,
        text: labels,
        type: "bar",
        orientation: "h",
        marker: { color: "rgb(12,46,179)" }
    
    }];

    const layout = {
         title: "Top 10 OTUs",
         yaxis: {
            tickmode: "linear"
         },
         margin:{
            l: 100,
            r: 100,
            b: 100,
            t: 100
         }
        };

    Plotly.newPlot("bar", data, layout);
}


function bubble(values, ids, labels) {
    const data = [{
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: { 
            color: ids,
            size: values,
         }
    }];
    
    const layout = {
        xaxis: {
            title: "OTU ID",
        }, 
        yaxis: {
            title: "Values",
            tickmode: "auto"
         },
        };

    Plotly.newPlot("bubble", data, layout);
}


function plot(id) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
        .then((data) => {
            console.log(data);

            // sample value
            let samples = data.samples.filter(sp => sp.id === id)[0]

            // Top 10 sample values
            let sampleValues = samples.sample_values.slice(0, 10)
            let otu_ids = samples.otu_ids.slice(0, 10)
            let otu_labels = samples.otu_labels.slice(0, 10)
            otu_ids = otu_ids.map(id => `OTU ${id}`)

            console.log(sampleValues);
            console.log(otu_labels);

            let metadata = data.metadata.filter(md => md.id == id)[0];
            let metadataDiv = d3.select("#sample-metadata");
            metadataDiv.html("");

            Object.entries(metadata).forEach(([key, value]) => {
                metadataDiv.append("p").text(`${key}: ${value}`);

            });

            // Plot Bar
            bar(sampleValues, otu_ids, otu_labels)
            //Plot Bubble
            bubble(sampleValues, otu_ids, otu_labels)


        })
}

plot('940')