<template>
  <div>
    <el-container>
      <el-main>
        <canvas id="myChart"></canvas>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
export default {
  name: 'Petrol',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/petrol')
      .then(response => {
        this.info = response.data
        console.log(this.info)
        this.drawChart()
      })
  },
  methods: {
    drawChart: function () {
      const ctx = document.getElementById('myChart').getContext('2d')
      const myChart = new Chart(ctx, {
        type: 'line',
        data: this.info.reduce((list, item) => {
          list.push(item.regions[0].prices[1].price)
          return list
        }, [])
      })
      console.log(myChart)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
