const chart_base = {
    chart: {
        type: '',
        renderTo: ''
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    xAxis: {
        allowDecimals: false,
        categories: [],
        title: {
            text: ''
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        opposite: true,
    },
    plotOptions: {},
    series: [{
        name: '',
        data: []
    }],
    credits: false
}

export default chart_base
