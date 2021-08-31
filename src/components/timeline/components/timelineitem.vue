<template>
  <a-popover :title="dataProps.taskName" placement="rightTop">
    <grid-item
      :x="dataProps.x"
      :y="dataProps.y"
      :w="dataProps.w"
      :h="dataProps.h"
      :i="dataProps.i"
      :key="dataProps.i"
      @move="moveEvent"
    >
      <div class="d-flex timeline-item-block font-primary" :style="{'background-color': randomColor}">
        <div>{{ dataProps.taskName }}</div>
        <a-divider class="h-90" type="vertical" />
        <div class="timeline-item-time">{{ taskDuration }}</div>
      </div>
    </grid-item>
    <template slot="content">
      <div class="d-flex detail-item">
        <div class="font-primary">Priority:&nbsp;&nbsp;</div>
        <a-tag :color="getPriorityColor(dataProps.priority.key)">{{dataProps.priority.value}}</a-tag>
      </div>
      <div class="d-flex detail-item">
        <div class="font-primary">Labels:&nbsp;&nbsp;</div>
        <a-tag v-for="(label, index) in dataProps.labels" :key="index">{{label}}</a-tag>
      </div>
      <div class="d-flex detail-item">
        <div class="font-primary">Person:&nbsp;&nbsp;</div>
        <div class="detail-person" v-for="(person, index) in dataProps.persons" :key="index">{{person}}</div>
      </div>
      <div class="d-flex detail-item">
        <div class="font-primary">Start Date:&nbsp;&nbsp;</div>
        <div>{{ dataProps.startDate | formatDate}}</div>
      </div>
      <div class="d-flex detail-item">
        <div class="font-primary">End Date:&nbsp;&nbsp;</div>
        <div>{{ dataProps.endDate | formatDate}}</div>
      </div>
      <div class="d-flex detail-item">
        <div class="font-primary">Duration:&nbsp;&nbsp;</div>
        <div>{{duration}}</div>
      </div>
      <a-divider/>
      <div class="font-primary detail-item">Description:</div>
      <div>{{dataProps.description}}</div>
    </template>
  </a-popover>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import { CommonFunc } from '../../../common/common';
const GridItem = VueGridLayout.GridItem;
export default {
  name: "TimeLineItem",
  props: ["dataProps", "accuracy"],
  components: {
    GridItem,
  },
  data() {
    let tempData = $.extend(true, {}, this.dataProps);
    return {
      columnMinute: 0,
      randomColor: CommonFunc.randomHexColor(),
      workHours: 24,
      defaultStartX: tempData.x,
      defaultStartDate: tempData.startDate,
      defaultEndDate: tempData.endDate,
    };
  },
  created() {
    this.columnMinute = this.workHours / this.accuracy * 60;
    this.defaultStartX = this.dataProps.x;
  },
  mounted() {},
  methods: {
    getPriorityColor(key) {
      let color = '';
      switch (key) {
        case 1:
          color = 'red';
          break;
        case 2:
          color = 'orange';
          break;
        case 3:
          color = 'yellow';
          break;
        case 4:
          color = 'green';
          break;
        default:
          break;
      }
      return color;
    },
    moveEvent(i, newX){
      let needAddMinute = (newX - this.defaultStartX) * this.columnMinute;
      this.dataProps.startDate = new Date(this.defaultStartDate.getTime() + needAddMinute * (1000 * 60));
      this.dataProps.endDate = new Date(this.defaultEndDate.getTime() + needAddMinute * (1000 * 60));
    },
  },
  computed: {
    duration() {
      return CommonFunc.dateDuration(this.dataProps.endDate, this.dataProps.startDate);
    },
    taskDuration() {
      return CommonFunc.dateFormat(this.dataProps.startDate, "MM-DD HH:mm") + " ~ " + CommonFunc.dateFormat(this.dataProps.endDate, "MM-DD HH:mm")
    }
  },
  filters: {
    formatDate(date) {
      return CommonFunc.dateFormat(date);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/timelineitem.scss";
</style>