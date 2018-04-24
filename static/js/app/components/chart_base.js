const bar_base = {
    chart: {
        type: 'column',
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
        data: [1,2,3]
    }],
    credits: false
}

const line_base = {
    chart: {
        type: 'column',
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
        data: [1,2,3]
    }],
    credits: false
}

export {bar_base, line_base}
