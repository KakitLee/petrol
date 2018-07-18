<template>
  <div class="hello">
    <el-badge :value="12" class="item">
      <el-button size="small">comments</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-button size="small">replies</el-button>
    </el-badge>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Petrol',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios.get('https://cors-anywhere.herokuapp.com/https://projectzerothree.info/prices.php')
      .then(response => {
        this.info = response.data
        console.log(this.parseHTML(this.info))
      })
  },
  methods: {
    parseHTML: (html) => {
      const re = /<table([0-9]|\w|\n)*<\/table>/
      var found = html.match(re)
      return found
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
