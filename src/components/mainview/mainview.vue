<template>
  <div class="mainview">
    <div class="title">
      <h1>Task Management</h1>
      <div class="setting-button cursor-p">
        <a-button icon="setting" @click="openSetting" />
      </div>
    </div>

    <TimeLine />
    <a-drawer
      title="Settings"
      placement="right"
      width="400"
      :closable="false"
      :visible="showSetting"
    >
      <a-spin :spinning="showLoading" size="large" tip="Loading...">
        <p class="font-primary">Task Date</p>
        <a-row>
          <a-col>
            <a-range-picker
              :format="dateFormat"
              v-model="taskDate"
            />
          </a-col>
        </a-row>
        <a-divider />
        <p class="font-primary">Display Options</p>
        <a-row class="mb-8">
          <div>Project Name:</div>
          <a-col>
            <a-select
              mode="tags"
              placeholder="Please select"
              v-model="tempSettingData.filter.projectNames"
              style="min-width: 350px"
              :allowClear="true"
            >
              <a-select-option v-for="(project) in settingData.filter.projectNames" :key="project">
                {{ project }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb-8">
          <div>Labels:</div>
          <a-col>
            <a-select
              mode="multiple"
              placeholder="Please select"
              style="min-width: 350px"
              :allowClear="true"
              v-model="tempSettingData.filter.labels"
            >
              <a-select-option v-for="(project) in settingData.filter.labels" :key="project">
                {{ project }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb-8">
          <div>Priority:</div>
          <a-col>
            <a-select
              mode="multiple"
              placeholder="Please select"
              style="min-width: 350px"
              :allowClear="true"
              v-model="tempSettingData.filter.priorities"
            >
              <a-select-option v-for="(project) in settingData.filter.priorities" :key="project">
                {{ project }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="mb-8">
          <div>Person:</div>
          <a-col>
            <a-select
              mode="multiple"
              placeholder="Please select"
              style="min-width: 350px"
              :allowClear="true"
              v-model="tempSettingData.filter.persons"
            >
              <a-select-option v-for="(project) in settingData.filter.persons" :key="project">
                {{ project }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-spin>
      <div :class="['setting-footer', showLoading ? 'ant-spin-blur' : '']">
        <a-button class="mr-8" @click="onCancelClick"> Cancel </a-button>
        <a-button type="primary" @click="onSaveClick"> Save </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import TimeLine from "../timeline/timeline.vue";
import { DataCommon } from "../../common/common";
import moment from 'moment';
export default {
  name: "MainView",
  props: [],
  components: {
    TimeLine,
  },
  data() {
    return {
      showLoading: false,
      showSetting: false,
      showTime: null,
      dateFormat: "YYYY-MM-DD",
      settingData: null,
      tempSettingData: null,
      filteredSettingData: null,
      taskDate: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      let setting = DataCommon.getSetting();
      this.settingData = $.extend(true, {},  setting);
      this.filteredSettingData = $.extend(true, {},  this.settingData);
      this.tempSettingData = $.extend(true, {},  this.filteredSettingData);
      this.taskDate = [moment(this.tempSettingData.dateFrom), moment(this.tempSettingData.dateTo)];
    },
    openSetting() {
      this.showSetting = true;
      this.showLoading = false;
      this.tempSettingData = $.extend(true, {},  this.filteredSettingData);
      this.taskDate = [moment(this.tempSettingData.dateFrom), moment(this.tempSettingData.dateTo)];
    },
    onCancelClick() {
      this.showSetting = false;
    },
    onSaveClick() {
      let vm = this;
      this.showLoading = true;
      this.filteredSettingData = $.extend(true, {}, this.tempSettingData);
      this.filteredSettingData.dateFrom = this.taskDate[0].toDate();
      this.filteredSettingData.dateTo = this.taskDate[1].toDate();
      setTimeout(() => {
        vm.showSetting = false;
      }, 500);
    },
    taskDateChange(date) {
      this.settingData.dateFrom = date[0].toDate();
      this.settingData.dateTo = date[1].toDate();
    },
    selectChange(item) {
      debugger;
      this.tempSettingData.filter.projectNames = item;
    }
  },
};
</script>

<style lang="scss">
@import "./scss/mainview.scss";
</style>