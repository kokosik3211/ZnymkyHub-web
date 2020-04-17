<template>
    <div>
      <section class="hero is-light has-margin-top-50 has-margin-bottom-50">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="is-size-3 has-text-left has-margin-bottom-15 has-margin-left-20">Activity</div>
            <div class="columns is-multiline is-centered">
              <div class="column is-12">
                <section id="activityChart" class="hero is-light is-medium is-bold rounded-corners panel-container"></section>
                <b-loading :is-full-page="true" :active.sync="isLoading.Activity" :can-cancel="true"></b-loading>
              </div>
            </div>

            <div class="is-divider"></div>

            <div class="is-size-3 has-text-left has-margin-bottom-15 has-margin-left-20">Audience</div>
            <div class="columns is-multiline is-centered">
              <div class="column is-6">
                <section class="hero is-light is-medium is-bold rounded-corners panel-container">
                  <div class="is-size-4 has-margin-top-5">Gender</div>
                  <div id="genderChart" class="center-all"></div>
                </section>
              </div>
              <div class="column is-6">
                <section class="hero is-light is-medium is-bold rounded-corners panel-container">
                  <div class="is-size-4 has-margin-top-5">Top locations</div>
                  <div id="locationChart" class="center-all"></div>
                </section>
              </div>
            </div>
            <div class="columns is-multiline is-centered">
              <div class="column is-6">
                <section class="hero is-light is-medium is-bold rounded-corners panel-container">
                  <div class="is-size-4 has-margin-top-5">Age range</div>
                  <div id="ageChart" class="center-all"></div>
                </section>
              </div>
              <div class="column is-6">
                <section class="hero is-light is-medium is-bold rounded-corners panel-container">
                  <div class="is-size-4 has-margin-top-5">Likes / saved</div>
                  <div id="likesSavedChart" class="center-all"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { activityService } from "../../services/activity.service";

import ApexCharts from 'apexcharts'

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    profile: "user/profile"
  })
})
export default class Statictic extends Vue {
  private isLoading = {
    Activity: true
  };

  activityOptions = {
    chart: {
      type: 'area',
      height: 450,
      width: "100%",
      toolbar: {
        tools: {
          download: false,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        }
      },
    },
    series: [{
      name: 'Visitors',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: ["1991","1992","1993","1994vd",1995,1996,1997, 1998,1999]
    },
    stroke: {
      curve: 'smooth',
    }
  }

  genderOptions = {
    chart: {
      type: 'donut',
      height: 390,
    },
    legend: {
      show: false
    },
    series: [],//[120, 50],
    labels: [],//['Male', 'Female'],
    colors: ['#81df81', '#fece96'],
    dataLabels: {
      style: {
        fontSize: '20px',
        //fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#4c4946']
      },
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      style: {
        fontSize: '20px'
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    noData: {
      text: "No information",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '24px',
        fontFamily: undefined
      }
    }
  }

  locationOptions = {
    chart: {
      type: 'bar',
      height: 390,
      width: "100%",
      toolbar: {
        tools: {
          download: false,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        }
      },
    },
    series: [{
      name: 'Cities',
      data: []//[30,40,35,50,49,60,70,91,125]
    }],
    yaxis: {
      labels: {
        show: false,
        formatter: function (value: any) {
          return value + "%";
        }
      },
    },
    xaxis: {
      categories: []//[1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
        //endingShape: 'rounded'
      },
    },
    colors: ['#5ca5e5'],
    noData: {
      text: "No information",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '24px',
        fontFamily: undefined
      }
    }
  }

  ageOptions = {
    chart: {
      type: 'bar',
      height: 390,
      width: "100%",
      toolbar: {
        tools: {
          download: false,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        }
      },
    },
    series: [{
      name: 'Percentage',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999],
      labels: {
        show: false,
        formatter: function (value: any) {
          return value + "%";
        }
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    colors: ['#84cb99'],
  }

  likesSavedOptions = {
    series: [{
        name: 'Likes',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Saved',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    chart: {
      height: 390,
      type: 'area',
      toolbar: {
        tools: {
          download: false,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      //type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        //format: 'dd/MM/yy HH:mm'
      },
    }
  };

  private created() {
  }

  private mounted(){
    activityService.getActivities().then((resp: any) => {
      var data = resp.data.option;
      this.activityOptions.series = data.series;
      this.activityOptions.xaxis.categories = data.xaxis.categories;
      var activityChart = new ApexCharts(document.querySelector("#activityChart"), this.activityOptions);
      activityChart.render();
      this.isLoading.Activity = false;
    });

    activityService.getLikesSaved().then((resp: any) => {
      var data = resp.data.option;
      this.likesSavedOptions.series = data.series;
      this.likesSavedOptions.xaxis.categories = data.xaxis.categories;
      var likesSavedChart = new ApexCharts(document.querySelector("#likesSavedChart"), this.likesSavedOptions);
      likesSavedChart.render();
    });

    activityService.getGender().then((resp: any) => {
      var data = resp.data.option;
      this.genderOptions.series = data.series;
      this.genderOptions.labels = data.labels;
      var genderChart = new ApexCharts(document.querySelector("#genderChart"), this.genderOptions);
      genderChart.render();
    });

    activityService.getAge().then((resp: any) => {
      var data = resp.data.option;
      this.ageOptions.series = data.series;
      this.ageOptions.xaxis.categories = data.xaxis.categories;
      var ageChart = new ApexCharts(document.querySelector("#ageChart"), this.ageOptions);
      ageChart.render();
    });

    activityService.getLocation().then((resp: any) => {
      var data = resp.data.option;
      this.locationOptions.series = data.series;
      this.locationOptions.xaxis.categories = data.xaxis.categories;
      var locationChart = new ApexCharts(document.querySelector("#locationChart"), this.locationOptions);
      locationChart.render();
    });
  }

  private destroyed() {
  }
}
</script>

<style scoped>
.panel-container {
  height: 450px;
}
.rounded-corners {
  border-radius: 20px 40px;
}
.center-all {
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
