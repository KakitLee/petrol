<template>
  <div :style="{width: '80%'}">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <canvas id="All" width="400" height="250"></canvas>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <canvas id="VIC" width="400" height="250"></canvas>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <canvas id="NSW" width="400" height="250"></canvas>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <canvas id="QLD" width="400" height="250"></canvas>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <canvas id="WA" width="400" height="250"></canvas>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'

const colors = {
  'E10': 'rgb(255, 99, 132)',
  'U91': 'rgb(54, 162, 235)',
  'U95': 'rgb(75, 192, 192)',
  'U98': 'rgb(201, 203, 207)',
  'Diesel': 'rgb(153, 102, 255)',
  'LPG': 'rgb(255, 205, 86)'
}
export default {
  /* eslint-disable */
  name: 'Petrol',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/petrol')
      .then(response => {
        this.parseInfo(response.data)
        Object.keys(this.info).forEach(key => {
          this.drawChart(key, this.info[key]);
        });
      })
  },
  methods: {
    drawChart: function (id, info) {
      let datasets = [];
      let types = Object.keys(info);
      types.forEach(type => {
        let obj = {label: type, borderColor: colors[type], fill: false};
        let lineData = info[type].reduce((lineData, entry) => {
           lineData.push({t:entry.updated, y:entry.price, location: entry.suburb + ' ' + entry.state});
           return lineData;
        }, []);
        obj.data = lineData;
        datasets.push(obj);
      });
      const options = {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label;
              let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              console.log(value);
              return [`${label}: ${value.y}`, `${value.location}`];
            }
          }
        },
        responsive: true,
                title: {
          display: true,
                  text: `${id} Region Prices`
        },
        scales: {
          xAxes: [{
            type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
            ticks: {
              major: {
                fontStyle: 'bold',
                fontColor: '#FF0000'
              }
            },
            time: {
              displayFormats: {
                'millisecond': 'DD MMM hh:mm',
                'second': 'DD MMM hh:mm',
                'minute': 'DD MMM hh:mm',
                'hour': 'DD MMM hh:mm',
                'day': 'DD MMM hh:mm',
                'week': 'DD MMM hh:mm',
                'month': 'DD MMM hh:mm',
                'quarter': 'DD MMM hh:mm',
                'year': 'DD MMM hh:mm'
              } 
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'value'
            }
          }]
        }
      }
      const ctx = document.getElementById(id).getContext('2d')
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {datasets:  datasets},
        options: options
      })
    },
    parseInfo: function (info) {
      const charts = info.reduce(function(charts, item) {
        const created = item.updated
        item.regions.forEach(region => {
          if(charts[region.region] === undefined) {
          charts[region.region] = {};
        }
        region.prices.forEach(price => {
          if(charts[region.region][price.type] === undefined) {
            charts[region.region][price.type] = [];
          }
          let _price = price;
          _price.updated = new Date(1000 * created);
          _price.color = colors[price.type];
          charts[region.region][price.type].push(_price);
        });
      });
        return charts
      }, {})
      this.info = charts
      console.log(this.info)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
