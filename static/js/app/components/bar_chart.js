const bar_chart = {
	props: ['options', 'render_to'],
	template: `
		<div class="card">
			<div class="card-content">
				<div class="content">
					<div :id="render_to"></div>
				</div>
			</div>
		</div>
	`,
	data(){
		return{ chart:undefined }
	},
	methods:{
		redraw(){
			this.chart.series[0].setData(this.options.series[0].data,true);
		}
	},
	watch:{
		data(){this.redraw()}
	},
	mounted() {
		this.chart = new Highcharts.chart(this.options)
	}
};


export default bar_chart
