<template>
  <div class="timeline">
    <TimeLineHeader :data-props.sync="timelineHeaderData"/>
    <TimeLineContainer :data-props="componentData" :timeline-data="timelineHeaderData" >
    </TimeLineContainer>
  </div>
</template>

<script>
import TimeLineContainer from './components/timelinecontainer.vue'
import TimeLineHeader from './components/timelineheader.vue'
import { DataCommon } from '../../common/common'
export default {
  name: 'TimeLine',
  props: [
    
  ],
  components: {
    TimeLineContainer,
    TimeLineHeader
  },
  data() {
    return {
      componentData: [],
      settingData: [],
      timelineHeaderData: {
        dateFrom: null,
        dateTo: null
      },
      timelineData: [
        
      ]
    };
  },
  created() {
    this.init();
  },
  mounted() {

  },
  methods: {
    init() {
      let setting = DataCommon.getSetting();
      this.settingData = $.extend(true, {}, setting);
      let {dateFrom, dateTo, timeUnit} = this.settingData;
      this.timelineHeaderData = {dateFrom, dateTo, timeUnit};

      let data = DataCommon.getData(setting);
      this.componentData = new Array(...data);
    },

  },
   watch:{
    timelineHeaderData: {
      deep: true,
      handler: function (curVal) {
       console.log(curVal);
      }
    }
  },
};
</script>

<style lang="scss">
@import "./scss/timeline.scss";
</style>