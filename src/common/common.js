import moment from 'moment';

export const DataCommon = {
  getData: function (setting) {
    console.log(setting);
    return [{
        'taskName': 'task1',
        'description': 'This is a description,This is a description,This is a description,',
        'labels': [
          'TR2',
          'YRS'
        ],
        'priority': {
          'key': 1,
          'value': 'Blocker',
        },
        'startDate': new Date('2021-08-01 05:04:33'),
        'endDate': new Date('2021-08-03 08:05:31'),
        'persons': [
          'Mike',
          'Jack'
        ]
      },
      {
        'taskName': 'task2',
        'description': 'This is a description,This is a description,This is a description,',
        'labels': [
          'TR2',
          'YRS'
        ],
        'priority': {
          'key': 2,
          'value': 'Critical',
        },
        'startDate': new Date('2021-08-04 12:34:53'),
        'endDate': new Date('2021-08-08 10:08:37'),
        'persons': [
          'Mike',
          'Chimu'
        ]
      },
      {
        'taskName': 'task3',
        'description': 'This is a description,This is a description,This is a description,',
        'labels': [
          'TR2',
          'YRS'
        ],
        'priority': {
          'key': 3,
          'value': 'Major',
        },
        'startDate': new Date('2021-08-03'),
        'endDate': new Date('2021-08-09'),
        'persons': [
          'Mike',
          'Leo'
        ]
      },
      {
        'taskName': 'task4',
        'description': 'This is a description,This is a description,This is a description,',
        'labels': [
          'TR2',
          'YRS'
        ],
        'priority': {
          'key': 4,
          'value': 'Normal',
        },
        'startDate': new Date('2021-08-09'),
        'endDate': new Date('2021-08-18'),
        'persons': [
          'Mike',
          'Tony'
        ]
      },
      {
        'taskName': 'task5',
        'description': 'This is a description,This is a description,This is a description,',
        'labels': [
          'TR2',
          'YRS'
        ],
        'priority': {
          'key': 4,
          'value': 'Normal',
        },
        'startDate': new Date('2021-08-18'),
        'endDate': new Date('2021-08-22'),
        'persons': [
          'Mike'
        ]
      }
    ]
  },

  getSetting: function () {
    var setting = {
      dateFrom: new Date('2021-08-01 00:01'),
      dateTo: new Date(),
      timeUnit: 'Day', //Month,Year,Day,Hour,Minute
      filter: {
        'projectNames': [
          "TR2",
          "FGO",
          "PWA",
          "CIC"
        ],
        'priorities': [
          'Normal',
          'Major',
          'Critical'
        ],
        'persons': [
          'Mike',
          'Chimu',
          'Tony',
          'Jack'
        ],
        'labels': [
          'TR2',
          "FGO",
          "PWA",
          "CIC"
        ]
      }
    };
    return setting;
  }


}

export const CommonFunc = {
  isInt(obj) {
    return typeof obj === 'number' && obj % 1 === 0
  },

  getDateDiff(dateFrom, dateTo, unit = "Day") {
    let timeDiff = Math.abs(dateTo - dateFrom);
    switch (unit) {
      case "Year":
        timeDiff = timeDiff / 1000 / 60 / 60 / 24 / 30 / 12;
        break;
      case "Month":
        timeDiff = timeDiff / 1000 / 60 / 60 / 24 / 30;
        break;
      case "Day":
        timeDiff = timeDiff / 1000 / 60 / 60 / 24;
        break;
      case "Hour":
        timeDiff = timeDiff / 1000 / 60 / 60;
        break;
      case "Minute":
        timeDiff = timeDiff / 1000 / 60;
        break;
      default:
        break;
    }
    if (CommonFunc.isInt(timeDiff)) {
      return timeDiff + 1;
    } else {
      return Math.ceil(timeDiff);
    }
  },

  dateFormat(date, formatStr = "YYYY-MM-DD HH:mm:ss") {
    return moment(date).format(formatStr);
  },

  dateDuration(date1, date2, workHour = 8) {
    let dura = Math.abs(date1 - date2);
    let month = Math.floor(dura / 1000 / 60 / 60 / 24 / 30);
    let day = Math.floor(dura / 1000 / 60 / 60 / 24 % 30);
    let hour = Math.floor(dura / 1000 / 60 / 60 % 24);
    let minute = Math.floor(dura / 1000 / 60 % 60);
    let str = '';
    if (month) {
      str += month + " months ";
    }
    if (day) {
      str += day + " days ";
    }
    if (hour) {
      if (hour > workHour && (24 - hour) < workHour) {
        hour = workHour - (24 - hour);
      } else if (hour >= workHour) {
        day++;
        hour = 0;
      }
      if (hour) {
        str += hour + " hours ";
      }
    }
    if (minute) {
      str += minute + " minutes ";
    }
    return str;
  },
  randomHexColor() {
    return 'rgb(' +
      Math.round(Math.random() * 255) +
      ', ' +
      Math.round(Math.random() * 255) +
      ', ' +
      Math.round(Math.random() * 255) +
      ', ' + '0.5' +
      ')';
  }
}