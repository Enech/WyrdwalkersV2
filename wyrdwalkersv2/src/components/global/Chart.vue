<template>
  <div class="chartElem">
      <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  props: ["chartOptions"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.chartElem, .chart {
  width: 100%;
}
</style>