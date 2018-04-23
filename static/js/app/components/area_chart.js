const solackChart = {
	props: ['data', 'steven', 'agePotValue'],
	template: `
	<div>
		<p>{{ data }}</p>
		<h1>{{ steven }}</h1>
		<h1>{{ agePotValue }}</h1>
		<div id="thechart"></div>
	</div>
	`,
  data(){
  	return{
  		chart:undefined
  	}
  },
  methods:{
  	redraw(){
    	this.chart.series[0].setData(this.agePotValue,true);
    }
  },
  watch:{
  	data(){this.redraw()},
    steven(){this.redraw()},
    agePotValue(){this.redraw()},
  },
	mounted() {
		var highchartsOptions = {
			chart: {
				type: 'area',
				renderTo: 'thechart'
			},
			credits: {
				enabled: false
			},
			tooltip: {
				enabled: false
			},
			title: {
				text: ''
			},
			xAxis: {
				allowDecimals: false,
				title: {
					text: 'Age'
				}
			},
			yAxis: {
				title: {
				  text: 'Pot Value'
				},
				labels: {
					formatter: function () {
				    return '£' + this.value / 1000 + 'k';
				  }
				},
				opposite: true,
			},
			plotOptions: {},
			series: [{
    		name: '',
    		data: this.agePotValue
  		}],
			credits: false
    	}
			this.chart = new Highcharts.chart(highchartsOptions)
	}
};

export default solackChart
