// Function to Load and Parse CSV Data
function loadCSV(url, callback) {
    Papa.parse(url, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            callback(results.data);
        },
        error: function (error) {
            console.error('Error loading CSV:', error);
        }
    });
}

// Function to Create Line Chart
function createLineChart(data) {
    const dates = data.map(row => row.Date);
    const returns = data.map(row => row.Return);

    const trace = {
        x: dates,
        y: returns,
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Returns',
        line: { color: '#17BECF' }
    };

    const layout = {
        title: 'Investment Strategy Returns Over Time',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Return (%)' }
    };

    Plotly.newPlot('line-chart', [trace], layout);
}

// Function to Create Pie Chart
function createPieChart(data) {
    const industries = data.map(row => row.Industry);
    const exposures = data.map(row => row.Exposure);

    const trace = {
        labels: industries,
        values: exposures,
        type: 'pie',
        name: 'Industry Exposures',
        textinfo: 'label+percent',
        hoverinfo: 'label+value+percent'
    };

    const layout = {
        title: 'Portfolio Industry Exposures'
    };

    Plotly.newPlot('pie-chart', [trace], layout);
}

// Load Data and Generate Charts After DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    loadCSV('returns.csv', createLineChart);
    loadCSV('exposures.csv', createPieChart);
});
