<template>
  <div>
    <div class="header-date">
      <RangePicker :defaultValue="showTime" :format="dateFormat" @change="onChange" />
    </div>
    <div class="header-container">
      <a-tooltip placement="top" v-for="i in totalColumn" class="header-item" :key="i" :title="getTitle(i)">
        <span class="header-text">{{i | getHeaderText}}</span>
        <div class="header-background" :style="{'height': backHeight}"></div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import moment from 'moment';
import { CommonFunc } from '../../../common/common'
Vue.use(DatePicker);
const {RangePicker} = DatePicker;
let vm;
export default {
  name: "TimeLineHeader",
  props: [
    "dataProps"
  ],
  components: {
    RangePicker
  },
  data() {
    let {dateFrom, dateTo, timeUnit} = this.dataProps;
    vm = this;
    return {
      moment,
      dateFormat: "YYYY-MM-DD",
      dateFrom,
      dateTo,
      timeUnit,
      backHeight: ''
    };
  },
  created() {},
  mounted() {
    this.initBackground();
  },
  methods: {
    onChange(date) {
      this.dateFrom = date[0].toDate();
      this.dateTo = date[1].toDate();
    },

    getBackRefElement() {
      let element = document.getElementsByClassName("vue-grid-layout");
      if (element.length) {
        return element[0]
      }
      return null;
    },

    initBackground() {
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let element = this.getBackRefElement();
      vm.backHeight = element.style.height;
      if (!element) {
        return;
      }
      let observer = new MutationObserver(() => {
        setTimeout(() => {
          let el = vm.getBackRefElement();
          if (el) {
            let height = el.style.height;
            if (height == vm.backHeight)
              return;

            vm.backHeight = height;
          }
        }, 500);
      })
      observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
    },

    getTitle(value) {
      let fromDate = new Date(vm.dateFrom);
      fromDate.setDate(fromDate.getDate() + value - 1); 
      return vm.moment(fromDate).format(vm.dateFormat);
    },

    syncDataToParent() {
      vm.$emit("update:dataProps", $.extend(true, {}, vm.dataProps, {dateFrom: vm.dateFrom, dateTo: vm.dateTo, totalColumn: vm.totalColumn}));
    }
  },
  filters: {
    getHeaderText(value) {
      let fromDate = new Date(vm.dateFrom);
      fromDate.setDate(fromDate.getDate() + value - 1);
      let day = fromDate.getDate();
      let result = day.toString().padStart(2,0);
      if (vm.dateFrom.getMonth() != fromDate.getMonth()) {
        //result = (fromDate.getMonth() + 1).toString().padStart(2,0) + "-" + result;
      }
      return result;
    }
  },
  watch:{
    dataProps: {
      deep: true,
      handler: function (curVal) {
        this.dateFrom = curVal.dateFrom;
        this.dateTo = curVal.dateTo;
      }
    },
    totalColumn: {
      handler: function () {
        vm.syncDataToParent();
      }
    }
  },
  computed: {
    showTime() {
      let startMoment = this.moment(this.dateFrom);
      let endMoment = this.moment(this.dateTo);
      return [startMoment, endMoment];
    },

    totalColumn() {
      return CommonFunc.getDateDiff(this.dateFrom, this.dateTo, this.timeUnit);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/timelineheader.scss";
</style>