<template>
  <div>
    <el-container>
      <el-main>
        <div v-for="(value, region) in info" :key="region">
          <h1>{{region}}</h1>
          <canvas :id="region"></canvas>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
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
        this.drawChart('All', this.info.All.U95)
      })
  },
  methods: {
    drawChart: function (id, info) {
      const ctx = document.getElementById(id).getContext('2d')
      const myChart = new Chart(ctx, {
        type: 'line',
        data: info
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
        _price.updated = created;
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
