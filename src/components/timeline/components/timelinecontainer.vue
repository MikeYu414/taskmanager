<template>
  <div class="board" style="width: 100%">
    <div class="home">
      <grid-layout
        :layout="layoutData"
        :col-num="colNum"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[0, 10]"
        :use-css-transforms="true"
      >
      <time-line-item v-for="(item,index) in layoutData" :data-props="item" :key="index" :accuracy="accuracy"/>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import TimeLineItem from './timelineitem.vue';
import { CommonFunc } from '../../../common/common';
const GridLayout = VueGridLayout.GridLayout;
export default {
  name: "TimeLineContainer",
  props: [
    "dataProps",
    "timelineData"
  ],
  data() {
    return {
      layoutData: [],
      colNum:0,
      accuracy: 96,
      layoutConfig: {
        height: 100, // 默认高度
        dialogVisible: false, // 是否可拖拽或改变大小
      },
    };
  },
  components: {
    GridLayout,
    TimeLineItem
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.initColumns();
      this.dealData();
    },

    initColumns() {
      this.colNum = CommonFunc.getDateDiff(this.timelineData.dateFrom, this.timelineData.dateTo, this.timelineData.timeUnit) * this.accuracy;
    },

    dealData() {
      this.layoutData = [];
      for (let index = 0; index < this.dataProps.length; index++) {
        const {startDate, endDate} = this.dataProps[index];
        let proxyData = this.dateToProxy(startDate, endDate);
        proxyData.i = index;
        proxyData = $.extend(true, proxyData, this.dataProps[index]);
        this.layoutData.push(proxyData);
      }
    },

    dateToProxy(startDate, endDate) {
      const {dateFrom} = this.timelineData;
      let dateStartDiff = startDate - dateFrom;
      let dateEndDiff = endDate - dateFrom;
      let y = 0, h = 1;
      let x = Math.floor(dateStartDiff / 1000 / 60 / 60 / 24 * this.accuracy);
      let w = Math.floor(dateEndDiff / 1000 / 60 / 60 / 24 * this.accuracy) - x;
      return {
        x,
        y,
        h,
        w
      }
    },

    proxyToDate() {
      
    }
  },
  watch: {
    timelineData: {
      deep: true,
      handler: function () {
        this.init();
      }
    },
  }
};
</script>

<style lang="scss">
@import "../scss/timelinecontainer.scss";
</style>